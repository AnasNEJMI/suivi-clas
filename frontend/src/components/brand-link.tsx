import { Link, type LinkProps } from 'react-router'

interface BrandLinkProps extends LinkProps{
    to : string,
    label : string,
}
const BrandLink = ({
    to,
    label
} : BrandLinkProps) => {
  return (
    <Link to={to} className='relative text-nowrap p-4 bg-lime-100 rounded-full font-outfit font-medium border border-lime-300 hover:bg-lime-50'>{label}</Link>
  )
}

export default BrandLink