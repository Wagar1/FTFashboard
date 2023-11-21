import ErrorFallback from "../components/Fallbacks/ErrorFallback";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const AppProvider = (props) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div>
          <Router>{props.children}</Router>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AppProvider;
