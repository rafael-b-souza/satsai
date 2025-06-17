import { forwardRef, HTMLAttributes } from 'react'
import clsx from 'clsx'
import './Card.css'

export default forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={clsx('ui-card', className)} {...props} />
})
