


'use client'

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-Transactions"

import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction"
import { useConfirm } from "@/hooks/use-confirm"

type Props = {
  id: string
}

export const Actions = ({
  id
}: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Apa kamu yakin?",
    "Kamu akan menghapus semua transaksi ini."
  )
  const deleteMutation = useDeleteTransaction(id)
  const { onOpen } = useOpenTransaction()

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant={"ghost"}>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}