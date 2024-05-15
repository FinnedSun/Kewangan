"use client"

import { useGetAccouts } from "@/features/accountes/api/use-get-accounts";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccouts()

  if (isLoading) {
    return (
      <div>
        Loding..
      </div>
    )
  }

  return (
    <div>
      {accounts?.map((account) => (
        <div key={account.id}>
          {account.name}
        </div>
      ))}
    </div>
  );
}
