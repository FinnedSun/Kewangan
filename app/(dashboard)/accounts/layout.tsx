type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: "Accounts"
};


const AccountsLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default AccountsLayout