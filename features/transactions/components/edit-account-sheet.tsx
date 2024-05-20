import { z } from "zod"

import { AccountForm } from "@/features/accounts/components/account-form"
import { useEditAccount } from "@/features/accounts/api/use-edit-account"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"

import { useConfirm } from "@/hooks/use-confirm"
import { insertAccountSchema } from "@/db/schema"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useGetAccout } from "@/features/accounts/api/use-get-account"
import { Loader } from "lucide-react"

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount()

  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Kamu akan menghapus semua akun ini."
  )

  const accountQuery = useGetAccout(id)
  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)

  const isPending =
    editMutation.isPending || deleteMutation.isPending

  const isLoading = accountQuery.isPending

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const defaultValue = accountQuery.data ? {
    name: accountQuery.data.name,
  } : {
    name: ""
  }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit akun
            </SheetTitle>
            <SheetDescription>
              Edit akun yang sudah ada.
            </SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="size-4 text-muted-foreground animate-spin" />
              </div>
            )
            : (
              <AccountForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defalutValues={defaultValue}
                onDelete={onDelete}
              />
            )
          }

        </SheetContent>
      </Sheet>
    </>
  )
}