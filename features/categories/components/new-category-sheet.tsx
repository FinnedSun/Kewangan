import { z } from "zod"

import { CategoryForm } from "@/features/categories/components/category-form"
import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useCreateCategory } from "@/features/categories/api/use-create-category"

import { insertCategoriesSchema } from "@/db/schema"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const formSchema = insertCategoriesSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()

  const mutation = useCreateCategory()

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
            Kategori baru
          </SheetTitle>
          <SheetDescription>
            Buat kategori baru untuk mengatur transaksi anda.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
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