import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  componentDidCatch(error: Error, info: { componentStack: string }) { console.error('ErrorBoundary', error, info) }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 24 }}><h2>Something went wrong</h2><pre>{this.state.error?.message}</pre></div>
    }
    return this.props.children
  }
}
export default ErrorBoundary
