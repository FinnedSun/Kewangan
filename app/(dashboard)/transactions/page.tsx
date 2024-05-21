"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { Loader2, Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { useGetAccouts } from "@/features/accounts/api/use-get-accounts"
import { Skeleton } from "@/components/ui/skeleton"
import { useBalkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"



const TransactionsPage = () => {
  const newTransactino = useNewTransaction()
  const deleteTransactions = useBalkDeleteTransactions()
  const accountsQuery = useGetAccouts()
  const accounts = accountsQuery.data || []

  const isDisabled = accountsQuery.isLoading || deleteTransactions.isPending

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Riwayat Transaksi
          </CardTitle>
          <Button size="sm" onClick={newTransactino.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteTransactions.mutate({ ids })
            }}
            filterKey="name"
            columns={columns}
            data={accounts}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
export default TransactionsPage