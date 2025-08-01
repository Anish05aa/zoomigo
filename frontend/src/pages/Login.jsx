import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('🚗 Welcome to Zoomigo! Login successful')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-none rounded-xl text-black text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className='text-gray-700'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book a vehicle
        </p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='text-gray-700'>Full Name</p>
            <input
              type='text'
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p className='text-gray-700'>Email</p>
          <input
            type='email'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='w-full'>
          <p className='text-gray-700'>Password</p>
          <input
            type='password'
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-[#ff6f61] text-white w-full py-2 rounded-md text-base hover:opacity-90 transition'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className='text-gray-700'>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-[#ff6f61] underline cursor-pointer'
            >
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-700'>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-[#ff6f61] underline cursor-pointer'
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
