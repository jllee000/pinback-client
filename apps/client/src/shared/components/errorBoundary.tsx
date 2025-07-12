import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    console.error('Error boundary caught error:', _error, _errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-gray900 mb-4 head3">
              문제가 발생했습니다
            </h2>
            <p className="text-gray600 mb-6 body2-r">
              페이지를 새로고침해 주세요. 문제가 지속되면 고객센터로 문의해
              주세요.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-main400 hover:bg-main300 rounded-lg px-6 py-3 text-white transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
