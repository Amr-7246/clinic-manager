'use client'
import { NextPage } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'
import Loading from '@/app/components/Loading'
import { useLogIn } from '@/APIs/Auth/logIn'
import { useUserInfoContext } from '@/context/userInfoContext'

const Backend_Route = process.env.NEXT_PUBLIC_BACK_END_URL

const Platforms = [
  {
    platform: 'Google',
    title: 'Continue with Google',
    icon: FaGoogle,
    colors: 'hover:bg-rose-100 text-rose-600 border-rose-300',
    route: `${Backend_Route}/auth/google`
  },
  {
    platform: 'GitHub',
    title: 'Continue with GitHub',
    icon: FaGithub,
    colors: 'hover:bg-gray-200 text-gray-800 border-gray-300',
    route: `${Backend_Route}/auth/github`
  },
  {
    platform: 'Facebook',
    title: 'Continue with Facebook',
    icon: FaFacebook,
    colors: 'hover:bg-blue-100 text-blue-600 border-blue-300',
    route: `${Backend_Route}/auth/facebook`
  }
]

const LoginPage: NextPage = () => {
  const { setUserInfo } = useUserInfoContext()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const { mutate: login, isPending } = useLogIn('clinic-manager/auth/login')

  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    let isValid = true

    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const userData: any = login(formData)
      setUserInfo(userData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className=" flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['email', 'password'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'email'}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors[field as keyof typeof errors] && (
                <p className="text-rose-500 text-sm mt-1">{errors[field as keyof typeof errors]}</p>
              )}
            </div>
          ))}

          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg font-medium shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ opacity: 0.8 }}
            disabled={isPending}
          >
            {isPending ? <Loading size="sm" /> : 'Sign In'}
          </motion.button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-3">
          {Platforms.map((platform) => (
            <motion.a
              key={platform.platform}
              href={platform.route}
              className={`flex items-center gap-3 px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${platform.colors}`}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <platform.icon className="text-xl" />
              {platform.title}
            </motion.a>
          ))}
        </div>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signin" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage
