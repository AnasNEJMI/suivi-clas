import { SiteHeader } from '../../components/site-header'
import { CreateUserForm } from '../../components/adminboard/create-user-form'

const AdminboardUsers = () => {
  return (
    <>
      <SiteHeader title='Utilisateurs'/>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
              <div className="w-full max-w-sm">
                  <CreateUserForm />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminboardUsers