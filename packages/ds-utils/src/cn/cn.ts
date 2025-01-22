import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string.
 *
 * @param {...ClassValue[]} inputs - The class values to combine.
 * @return {string} - The combined class string.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
