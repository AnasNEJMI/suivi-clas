import { BookOpenTextIcon, CalendarCheck2Icon, EyeIcon, FilePenLineIcon, User2Icon} from 'lucide-react';
import UserPageWrapper from '../student-page/page-wrapper'
import { Outlet } from 'react-router'
import type { UserPageTheme } from '@/lib/types/data.types';

const ROOT_PATH = '/association';

const PAGE_TABS = [
    {
      title: "Profile",
      url: `${ROOT_PATH}`,
      icon: User2Icon,
    }, 
    {
      title: "Séances",
      url: `${ROOT_PATH}/seances`,
      icon: BookOpenTextIcon,
    },
    {
      title: "Présence",
      url: `${ROOT_PATH}/presence`,
      icon: CalendarCheck2Icon,
    },
    {
      title: "Consultation",
      url: `${ROOT_PATH}/consultation`,
      icon: EyeIcon,
    },
    {
      title: "QCMs",
      url: `${ROOT_PATH}/qcms`,
      icon: FilePenLineIcon,
    },
]

const PAGE_THEME : UserPageTheme = {
    tabBorderHovered : 'border-zinc-300',
    tabBorderSelected : 'border-zinc-900',
    tabBgHovered : 'bg-zinc-200',
    tabBgSelected : 'bg-zinc-900',
    tabTextHovered : 'text-zinc-900',
    tabTextSelected : 'text-white',
}
const SEO_PAGE_TITLE = 'Mon espace association';

const AssociationPageLayout = () => {
  return (
    <UserPageWrapper
        tabs={PAGE_TABS}
        seoTitle={SEO_PAGE_TITLE}
        theme  = {PAGE_THEME}
    >
        <Outlet/>
    </UserPageWrapper>
  )
}

export default AssociationPageLayout