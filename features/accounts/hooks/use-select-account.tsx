import { useRef, useState } from "react";

import { useGetAccouts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog";
import { Select } from "@/components/select";

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  const accountQuery = useGetAccouts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }))

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null)
  const selectValue = useRef<string>()

  const confrim = () => new Promise((resolve, reject) => {
    setPromise({ resolve })
  })

  const hendleClose = () => {
    setPromise(null)
  }

  const hendleConfirm = () => {
    promise?.resolve(selectValue.current)
    hendleClose()
  }

  const hendleCancle = () => {
    promise?.resolve(undefined)
    hendleClose()
  }

  const ConfrimationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Pilih akun
          </DialogTitle>
          <DialogDescription>
            Tolong pilih akun untuk melajutkan.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Pilih akun"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => selectValue.current = value}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button
            onClick={hendleCancle}
            variant={"outline"}
          >
            Batal
          </Button>
          <Button
            onClick={hendleConfirm}
            variant={"outline"}
          >
            Confrim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfrimationDialog, confrim]
}