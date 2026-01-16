import type { ApiError } from '@/lib/errors/apiError.class'
import { toast } from 'sonner'

type ErrorToastProps = {
    error : ApiError
}
const ErrorToast = ({error: err} : ErrorToastProps) => {

  return toast.error(
        err.message
    )
  
}

export default ErrorToast