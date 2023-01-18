import { Component } from "react";
import Error from "../error/Error";

type ErrorBoundaryStateType = {
    error: boolean;
}

type ErrorBoundaryPropType = {
    children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryPropType, ErrorBoundaryStateType> {

  state: ErrorBoundaryStateType = {
      error: false
  }

  static getDerivedStateFromError():ErrorBoundaryStateType {
      return { error: true };
    }
  
   render() {
    if (this.state.error) {
        return <Error/>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;