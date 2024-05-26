import { Header } from "@/components/header"

export const metadata = {
  icons: [
    {
      url: "/logo-ori.svg",
      href: "/logo-ori.svg"
    }
  ]
};

type Props = {
  children: React.ReactNode
}


const LayoutDashboard = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>
  )
}
export default LayoutDashboard