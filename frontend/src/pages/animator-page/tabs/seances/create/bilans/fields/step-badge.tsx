export function StepBadge({ step }: { step: number }) {
  return (
    <div className='absolute -top-6 right-0 h-6 px-3 text-xs font-bold rounded-t-md bg-indigo-600 text-white flex items-center justify-center uppercase'>
      ÉTAPE {step}
    </div>
  )
}