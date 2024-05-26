type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: "Categories"
};


const CategoriesLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default CategoriesLayout