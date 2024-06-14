import { Header } from "@/components/header"
import { Shortcut } from "@/components/shortcut";

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
        <Shortcut />
        {children}
      </main>
    </>
  )
}
export default LayoutDashboard