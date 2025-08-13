import { NextPage } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'
import { useLogIn } from '../Auth/logIn'
import Link from 'next/link'
import Loading from '@/app/components/Loading'

const Backend_Route = process.env.NEXT_PUBLIC_BACK_END_URL

const Platforms = [
  {
    platform: 'Google',
    title: 'Continue with Google',
    icon: FaGoogle,
    colors: 'hover:bg-red-50 hover:text-red-600',
    route: `${Backend_Route}/auth/google`
  },
  {
    platform: 'GitHub',
    title: 'Continue with GitHub',
    icon: FaGithub,
    colors: 'hover:bg-gray-50 hover:text-gray-900',
    route: `${Backend_Route}/auth/github`
  },
  {
    platform: 'Facebook',
    title: 'Continue with Facebook',
    icon: FaFacebook,
    colors: 'hover:bg-blue-50 hover:text-blue-600',
    route: `${Backend_Route}/auth/facebook`
  }
]

const LoginPage: NextPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const { mutate: login, isPending } = useLogIn()

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
      login(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="auth-title fade-in">Welcome Back</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="auth-label fade-in">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="auth-label fade-in">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ opacity: 0.8 }}
            disabled={isPending}
          >
            {isPending ? <Loading size="sm" /> : 'Sign In'}
          </motion.button>
        </form>

        <div className="divider">
          <span className="divider-text">or continue with</span>
        </div>

        <div className="space-y-3">
          {Platforms.map((platform) => (
            <motion.a
              key={platform.platform}
              href={platform.route}
              className={`social-login-button ${platform.colors}`}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <platform.icon className="text-xl" />
              {platform.title}
            </motion.a>
          ))}
        </div>

        <p className="text-center mt-6 text-[var(--text-secondary)]">
          Do ont have an account?{' '}
          <Link href="/tools/Auth/signin" className="auth-link">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage