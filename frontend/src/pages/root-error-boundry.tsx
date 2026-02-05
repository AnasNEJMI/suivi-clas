import { isRouteErrorResponse, useRouteError } from "react-router";
import ErrorPage from "./error";

export function RootErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if(error.status === 404){
      return (
        <ErrorPage
            message="Page Introuvable"
            status="404"
            data= {error.data}
            showData = {false}    
        />
      )
    }
    return (
      <section className="w-full h-dvh flex items-center justify-center">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </section>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}