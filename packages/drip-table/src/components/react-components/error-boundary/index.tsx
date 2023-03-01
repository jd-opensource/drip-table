/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React, { ErrorInfo } from 'react';

import Result from '@/components/react-components/result';

interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state = { hasError: false, errorInfo: '' };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  public componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="error"
          title="Something went wrong."
          extra={this.state.errorInfo}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
