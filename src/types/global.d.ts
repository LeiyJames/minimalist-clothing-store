// Global type definitions for better TypeScript support

declare global {
  interface Window {
    lenis?: {
      scrollTo: (target: number, options?: {
        duration?: number
        easing?: (t: number) => number
        offset?: number
        immediate?: boolean
        lock?: boolean
        force?: boolean
      }) => void
      destroy: () => void
      raf: (time: number) => void
    }
  }
}

// Lenis instance type
export interface LenisInstance {
  scrollTo: (target: number, options?: {
    duration?: number
    easing?: (t: number) => number
    offset?: number
    immediate?: boolean
    lock?: boolean
    force?: boolean
  }) => void
  destroy: () => void
  raf: (time: number) => void
}

export {}
