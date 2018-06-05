// @flow
export type TOptions = {
  defaultUnit: string,
  breakpoints: TBreakpoint[],
}

export type TBreakpoint = {
  name: string,
  from?: number,
  to?: number,
}

export type TBreakpointBehavior = 'up' | 'down' | 'only'

const defaultOptions: TOptions = {
  defaultUnit: 'px',
  breakpoints: [
    {
      name: 'xs',
      to: 575,
    },
    {
      name: 'sm',
      from: 576,
      to: 768,
    },
    {
      name: 'md',
      from: 769,
      to: 992,
    },
    {
      name: 'lg',
      from: 993,
      to: 1199,
    },
    {
      name: 'xl',
      from: 1200,
    },
  ],
}

export default defaultOptions
