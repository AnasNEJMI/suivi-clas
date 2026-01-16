import React from 'react'
import { toast } from 'sonner'

type SuccessTostProps<T> = {
    message : string,
    data : T
}

function SuccessToast<T>({message, data} : SuccessTostProps<T>) {

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
}

export default SuccessToast