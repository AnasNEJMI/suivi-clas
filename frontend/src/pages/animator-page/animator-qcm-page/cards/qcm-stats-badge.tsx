
const QcmStatsBadge = ({title, value} : {title : string, value : string}) => {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between items-center justify-center border border-zinc-200 bg-zinc-50 rounded-md lg:px-4 px-2 py-2 lg:py-2'>
        <span className="font-normal text-sm opacity-75">{title}</span>
        <span className="font-bold text-lg capitalize">{value}</span>
    </div>
  )
}

export default QcmStatsBadge