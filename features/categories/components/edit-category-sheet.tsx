import { z } from "zod"

import { CategoryForm } from "@/features/categories/components/category-form"
import { useEditCategory } from "@/features/categories/api/use-edit-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"

import { useConfirm } from "@/hooks/use-confirm"
import { insertCategoriesSchema } from "@/db/schema"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useGetCategory } from "@/features/categories/api/use-get-category"
import { Loader } from "lucide-react"

const formSchema = insertCategoriesSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory()

  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Kamu akan menghapus semua kategori di akun ini."
  )

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isPending =
    editMutation.isPending || deleteMutation.isPending

  const isLoading = categoryQuery.isPending

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

  const defaultValue = categoryQuery.data ? {
    name: categoryQuery.data.name,
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
              Edit kategori
            </SheetTitle>
            <SheetDescription>
              Edit kategori yang sudah ada.
            </SheetDescription>
          </SheetHeader>
          {isLoading
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="size-4 text-muted-foreground animate-spin" />
              </div>
            )
            : (
              <CategoryForm
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