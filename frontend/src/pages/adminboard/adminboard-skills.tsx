import AddSkillForm from '@/components/adminboard/add-skill-form'
import { SiteHeader } from '../../components/site-header'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import type { Skill } from '@/api/api.types'

const AdminboardSkills = () => {
  const loaderData = useRouteLoaderData("admin") as {users : User[], subjects : string[], skills : Skill[]}
  return (
    <>
        <SiteHeader title='Compétences'/>
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="min-h-svh w-full flex items-center justify-center p-6">
                    <AddSkillForm
                      className=''
                      users={loaderData.users}
                      skills={loaderData.skills}
                    />
              </div>
        </div>
        </div>
    </>
  )
}

export default AdminboardSkills