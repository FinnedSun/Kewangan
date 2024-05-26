type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: "Tranactions"
};


const TransactionsLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default TransactionsLayout