import { UserManagement } from "@/components/user-management"

export default function UserManagementPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      <UserManagement />
    </div>
  )
}

