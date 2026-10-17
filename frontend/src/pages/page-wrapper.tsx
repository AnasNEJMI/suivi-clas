import { SEOHead } from '@/components/seo-head'
import UserLayout from '@/layouts/user-layout'
import type { UserLayoutTab, UserPageTheme } from '@/lib/types/data.types'

interface UserPageWrapperProps {
    seoTitle : string,
    tabs : UserLayoutTab[],
    theme : UserPageTheme,
    children : React.ReactNode
}   

const UserPageWrapper = ({
    seoTitle,
    tabs,
    theme,
    children
}: UserPageWrapperProps) => {
  return (
    <>
        <SEOHead noIndex title={seoTitle} />
        <UserLayout tabs={tabs} theme = {theme}>
            {children}
        </UserLayout>
    </>
  )
}

export default UserPageWrapper