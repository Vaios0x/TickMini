/// <reference types="react" />
/// <reference types="react-dom" />

// Extender el módulo React para asegurar que JSX funcione
declare module 'react' {
  interface JSX {
    IntrinsicElements: {
      [elemName: string]: any
    }
  }
}

// Extender el módulo React-DOM para asegurar que JSX funcione
declare module 'react-dom' {
  interface JSX {
    IntrinsicElements: {
      [elemName: string]: any
    }
  }
}

// Extender el namespace JSX global
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

// Declarar tipos específicos de React que pueden estar faltando
declare module 'react' {
  export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    clientX: number
    clientY: number
    pageX: number
    pageY: number
    screenX: number
    screenY: number
    button: number
    buttons: number
    relatedTarget: EventTarget | null
    movementX: number
    movementY: number
  }

  export interface CSSProperties {
    [key: string]: any
  }

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T
    props: P
    key: Key | null
  }

  export interface ReactNode {
    [key: string]: any
  }

  export interface ComponentPropsWithoutRef<T> {
    [key: string]: any
  }

  export interface ElementRef<T> {
    [key: string]: any
  }

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T
  export function useRef<T>(initialValue: T): { current: T }
  export function forwardRef<T, P = {}>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>
}

// Declarar tipos para eventos del DOM
declare global {
  interface ClipboardEvent extends Event {
    clipboardData: DataTransfer | null
  }
}
