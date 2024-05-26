type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: "Settings"
};


const SettingsLayout = ({ children }: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default SettingsLayout