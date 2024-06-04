import { Button } from "@repo/ui"
import { Input } from "@repo/ui"

export default function Page(): JSX.Element {
  return (
    <div className="container">
      <Button>Click me!</Button>
      <p>Hello from my home page</p>
      <Input type="text" />
    </div>
  )
}
