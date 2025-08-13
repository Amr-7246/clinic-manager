import { NextPage } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa'
import { useSignUp } from '../Auth/signUp'
import Link from 'next/link'
import Loading from '@/app/components/Loading'

// ~ ####### Data
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
// ~ ####### Data


const SignUpPage: NextPage = () => {
  //~ ####### Hooks
    // & Backend Connection
      const { mutate: signup, isPending } = useSignUp()
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const [errors, setErrors] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  //~ ####### Hooks
  //~ ####### Logics
    const validateForm = () => {
      const newErrors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      let isValid = true

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
        isValid = false
      }

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

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
        isValid = false
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
        isValid = false
      }

      setErrors(newErrors)
      return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (validateForm()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...signupData } = formData
        signup(signupData)
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
  //~ ####### Logics

  return (
    <div className="auth-container">
      <motion.div  className="auth-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} >
        <h1 className="auth-title fade-in">Create Account</h1>
        
        {/* Main Form with required feild */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="form-group">
              <label htmlFor="name" className="auth-label fade-in">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
                placeholder="Enter your name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

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
                placeholder="Create a password"
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="auth-label fade-in">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>

            <motion.button type="submit" className="auth-button" whileHover={{ opacity: 0.9 }} whileTap={{ opacity: 0.8 }} disabled={isPending} >
              {isPending ? <Loading size="sm" /> : 'Sign Up'}
            </motion.button>

          </form>
        {/* Main Form with required feild */}
        
        <div className="divider">
          <span className="divider-text">or continue with</span>
        </div>

        {/* Continue with another Platforms */}
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
        {/* Continue with another Platforms */}

        <p className="text-center mt-6 text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link href="/tools/Auth/login" className="auth-link">
            Sign in
          </Link>
        </p>
        
      </motion.div>
    </div>
  )
}

export default SignUpPage