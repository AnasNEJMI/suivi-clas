import React from 'react'
import { toast } from 'sonner'

type SuccessTostProps<T> = {
    message : string,
    data? : T | undefined
}

function SuccessToast<T>({message, data = undefined} : SuccessTostProps<T>) {

    if(data){
        return toast.success(
          message,
          {
              description : (
                  <pre className="mt-2 w-[320px] rounded-md p-4">
                      <code>{JSON.stringify(data, null, 2)}</code>
                  </pre>
              ),
              position: "bottom-right",
              classNames: {
                  content: "flex flex-col gap-2",
              },
              style: {
                  "--border-radius": "calc(var(--radius)  + 4px)",
              } as React.CSSProperties,
          }
        )
    }else{
        return toast.success(
          message,
          {
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2 text-lg font-medium",
            },
            style: {
                "--normal-bg": "color-mix(in oklab, var(--color-lime-300) 85%, transparent)",
                "--normal-border": "var(--color-lime-400)",
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
          }
        )

    }
}

export default SuccessToast