"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Loader2, Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { useGetAccouts } from "@/features/accounts/api/use-get-accounts"
import { Skeleton } from "@/components/ui/skeleton"
import { useBalkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete"



const AccountsPage = () => {
  const newAccount = useNewAccount()
  const deleteAccounts = useBalkDeleteAccounts()
  const accountsQuery = useGetAccouts()
  const accounts = accountsQuery.data || []

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending

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
            Accounts
          </CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteAccounts.mutate({ ids })
            }}
            filterKey="email"
            columns={columns}
            data={accounts}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
export default AccountsPage