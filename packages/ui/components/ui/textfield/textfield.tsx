import { forwardRef } from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { InputStyle } from "./style"
import { LabelStyle } from "./style"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const inputVariants = cva(InputStyle.base)
const labelVariants = cva(LabelStyle.base)

const Textfield = forwardRef<HTMLInputElement, InputProps & { label: string }>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          id={label}
          pattern="[.*]"
          type={type}
          className={cn(inputVariants(), className, !label && "pt-0 py-1")}
          ref={ref}
          {...props}
        />
        <label htmlFor={label} className={cn(labelVariants())}>
          {label}
        </label>
      </div>
    )
  }
)

Textfield.displayName = "Textfield"

export { Textfield }
