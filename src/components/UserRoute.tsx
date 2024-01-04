import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../store/_index'

export default function UserRoute({
  isUser,
  isAdmin,
}: {
  isUser?: boolean | undefined
  isAdmin?: boolean | undefined
}) {
  const { user } = useSelector((state: RootState) => state.user)

  if (isUser) return user ? <Outlet /> : <Navigate to='/' replace />
  if (isAdmin) return user?.isAdmin ? <Outlet /> : <Navigate to='/' replace />
}
