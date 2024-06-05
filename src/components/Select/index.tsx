import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ReactNode, forwardRef } from 'react'

export interface SelectInputProps extends Select.SelectProps {
  children: ReactNode
  placeholder: string
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  ({ children, placeholder, ...props }, ref) => {
    return (
      <Select.Root {...props}>
        <Select.Trigger
          ref={ref}
          className="group flex w-full items-center justify-between gap-2 rounded border border-zinc-200 px-3 py-2 text-zinc-600 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 bg-zinc-100 focus:outline-none"
        >
          <Select.Value className="text-zinc-700" placeholder={placeholder} />
          <Select.Icon>
            <ChevronDown className="h-5 w-5 text-zinc-500" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            position="popper"
            sideOffset={8}
            className=" z-10 w-[--radix-select-trigger-width] overflow-hidden rounded border border-zinc-200 bg-zinc-100"
          >
            <Select.Viewport className="outline-none">
              {children}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  },
)
SelectInput.displayName = 'SelectInput'
