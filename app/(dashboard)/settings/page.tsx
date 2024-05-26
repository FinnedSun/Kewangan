"use client"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { UserProfile } from "@clerk/clerk-react"


const AccountsPage = () => {

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex py-5 px-10 justify-center">
              <UserProfile />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default AccountsPage