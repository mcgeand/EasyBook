import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS classes
 * Uses clsx for conditional classes and twMerge for Tailwind class merging
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date using Intl.DateTimeFormat
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  
  return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(dateObj)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

/**
 * Capitalizes the first letter of a string
 */
export const capitalizeString = (str: string): string => {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formats a price in dollars
 */
export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T, 
  ms = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
} 