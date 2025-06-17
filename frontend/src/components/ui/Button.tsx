import { forwardRef, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import './Button.css'

export default forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function Button({ className, ...props }, ref) {
  return <button ref={ref} className={clsx('ui-button', className)} {...props} />
})
