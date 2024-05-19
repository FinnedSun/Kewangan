import { z } from "zod"

import { AccountForm } from "@/features/accounts/components/account-form"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"

import { insertAccountSchema } from "@/db/schema"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount()

  const mutation = useCreateAccount()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            Akun baru
          </SheetTitle>
          <SheetDescription>
            Buat akun baru untuk melacak transakai kamu
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defalutValues={{
            name: ""
          }}
        />
      </SheetContent>
    </Sheet>
  )
}