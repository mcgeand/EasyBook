/// <reference types="react" />
/// <reference types="react-dom" />

// This file provides global type definitions for the project

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Type definitions for React if the module can't be resolved
declare module 'react' {
  export = React;
  
  namespace React {
    interface ReactElement {
      type: any;
      props: any;
      key: string | null;
    }
    
    export type FC<P = {}> = FunctionComponent<P>;
    export interface FunctionComponent<P = {}> {
      (props: P): ReactElement | null;
      displayName?: string;
    }

    export type KeyboardEvent<T = Element> = {
      key: string;
      target: EventTarget & T;
      preventDefault(): void;
      currentTarget: EventTarget & T;
    };

    export type ChangeEvent<T = Element> = {
      target: EventTarget & T;
      currentTarget: EventTarget & T;
    };

    export type FormEvent<T = Element> = {
      preventDefault(): void;
      target: EventTarget & T;
    };

    export type MouseEvent<T = Element> = {
      preventDefault(): void;
      currentTarget: EventTarget & T;
    };
  }
}

// Type definitions for React Router DOM if the module can't be resolved
declare module 'react-router-dom' {
  export interface LinkProps {
    to: string;
    className?: string;
    tabIndex?: number;
    'aria-label'?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    children?: React.ReactNode;
  }
  
  export const Link: React.FC<LinkProps>;
  export const Outlet: React.FC;
  export const Routes: React.FC<{children: React.ReactNode}>;
  export const Route: React.FC<{
    path?: string;
    element?: React.ReactElement;
    index?: boolean;
    children?: React.ReactNode;
  }>;
  export const BrowserRouter: React.FC<{children: React.ReactNode}>;
}

export {}; 