import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/_index'
import { getAddress, saveAddress } from '../../store/userService'
import style from './Address.module.scss'

export default function Address() {
  const [address, setAddress] = useState<{
    name: string
    phoneNumber: string
    address: string
    city: string
    province: string
    postalCode: string
    [key: string]: string
  }>({
    name: 'Tom',
    phoneNumber: '123-456-7890',
    address: '45 Rockefeller Plaza',
    city: 'New York',
    province: 'NY',
    postalCode: '10111',
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAddress())
  }, [])

  useEffect(() => {
    if (user.address) setAddress(user.address)
  }, [])

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(saveAddress(address))
      .unwrap()
      .then(() => {
        navigate('/placeOrder')
      })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const inputFields = [
    ['name', 'Name'],
    ['phoneNumber', 'Phone Number'],
    ['address', 'Address'],
    ['city', 'City'],
    ['province', 'Province'],
    ['postalCode', 'Postal Code'],
  ]

  return (
    <div className={style.Address}>
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler}>
        {inputFields.map(([key, value]) => (
          <div className={style.formControl} key={key}>
            <label htmlFor={key}>{value}</label>
            <input
              type='text'
              id={key}
              name={key}
              value={address[key]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        <button>Submit</button>
      </form>
    </div>
  )
}
