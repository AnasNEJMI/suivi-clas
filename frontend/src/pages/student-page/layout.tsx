import { Outlet} from 'react-router';
import {useEffect } from 'react';
import { studentApiCalls } from '@/api/student/apiCalls';
import { BicepsFlexedIcon, BookOpenTextIcon, FilePenLineIcon, GraduationCapIcon, User2Icon } from 'lucide-react';
import UserPageWrapper from './page-wrapper';
import type { UserPageTheme } from '@/lib/types/data.types';

const ROOT_PATH = '/etudiant';

const PAGE_TABS = [
    {
      title: "Séances",
      url: `${ROOT_PATH}`,
      icon: BookOpenTextIcon,
    }, 
    {
      title: "QCMs",
      url: `${ROOT_PATH}/qcms`,
      icon: FilePenLineIcon,
    },
    {
      title: "Méthode",
      url: `${ROOT_PATH}/methodologie`,
      icon: BicepsFlexedIcon,
    },
    {
      title: "Programme",
      url: `${ROOT_PATH}/programme`,
      icon: GraduationCapIcon,
    },
    {
      title: "Profile",
      url: `${ROOT_PATH}/profile`,
      icon: User2Icon,
    }
]

const PAGE_THEME : UserPageTheme = {
    tabBorderHovered : 'border-zinc-300',
    tabBorderSelected : 'border-zinc-900',
    tabBgHovered : 'bg-zinc-200',
    tabBgSelected : 'bg-zinc-900',
    tabTextHovered : 'text-zinc-900',
    tabTextSelected : 'text-white',
}
const SEO_PAGE_TITLE = 'Mon espace étudiant';

const StudentPageLayout = () => {

    useEffect(() => {
      void studentApiCalls.trackVisit();
    }, [])
    

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

export default StudentPageLayout