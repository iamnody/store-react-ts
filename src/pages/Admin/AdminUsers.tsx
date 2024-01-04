import { MouseEvent, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '../../store/_index'
import { deleteUserAdmin, getUsersAdmin } from '../../store/userService'

type Props = {}
export default function AdminUsers({}: Props) {
  const { users } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  function deleteUserHandler(e: MouseEvent, _id: string) {
    e.preventDefault()
    // if (window.confirm('Delete this user?')) {
    try {
      dispatch(deleteUserAdmin(_id)).unwrap()
      dispatch(getUsersAdmin())
    } catch (error) {
      console.log(error)
      toast.error('Deleting failed')
    }
    // }
  }

  useEffect(() => {
    dispatch(getUsersAdmin())
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => {
            if (x) {
              return (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>${x.email}</td>
                  <td>{x.isAdmin}</td>
                  <td>
                    <Link to={'/admin/user/' + x._id}>
                      <button className='btn-sm'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className='btn-sm'
                      onClick={(e) => deleteUserHandler(e, x._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}
