import type { FC, PropsWithChildren } from "react"

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="">{children}</div>
  </>
)

export default CenteredLayout
