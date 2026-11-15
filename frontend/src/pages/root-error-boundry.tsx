import { useEffect, useState } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import ErrorPage from "./error";
import { canReloadAutomatically, isChunkError, reloadOnce } from "@/lib/chunkReload";

export function RootErrorBoundary() {
  const error = useRouteError();
  const chunk = isChunkError(error);
  const [autoReload] = useState(canReloadAutomatically);

  useEffect(() => {
    if (chunk && autoReload) reloadOnce();
  }, [chunk, autoReload]);

  if (chunk) {
    return (
      <section className="w-full h-dvh flex flex-col items-center justify-center gap-4 text-center px-4">
        {autoReload ? (
          <p>Mise à jour de l’application…</p>
        ) : (
          <>
            <p>Une nouvelle version du site est disponible.</p>
            <button onClick={() => window.location.reload()}>
              Recharger la page
            </button>
          </>
        )}
      </section>
    );
  }
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorPage
          message="Page Introuvable"
          status="404"
          data={error.data}
          showData={false}
        />
      );
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