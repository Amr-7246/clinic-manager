'use client'

import { useTheme } from './ThemeContext'
import React from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={` relative inline-flex bg-black/50 h-10 w-10 items-center justify-center rounded-full text-sm font-medium hover:text-[var(--text)] transition-colors duration-200 cursor-pointer ${className} `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 250 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === 'light' ? (
          <FiSun className="h-5 w-5 text-[var(--theard)]" />
        ) : (
          <FiMoon className="h-5 w-5 text-[var(--theard)]" />
        )}
      </motion.div>

    </motion.button>
  )
}

// Alternative toggle with text
// export function ThemeToggleWithText({ className = '' }: ThemeToggleProps) {
//   const { theme, toggleTheme } = useTheme()

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className={`
//         inline-flex items-center gap-2 px-4 py-2 rounded-md
//         border border-[var(--border)] bg-[var(--input-bg)] text-sm font-medium
//         hover:bg-[var(--main)] hover:text-[var(--text)]
//         focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
//         transition-colors duration-200 shadow-lg hover:shadow-[var(--border)]/20
//         ${className}
//       `}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <motion.div
//         initial={false}
//         animate={{ rotate: theme === 'dark' ? 180 : 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         {theme === 'light' ? (
//           <FiMoon className="h-4 w-4 text-[var(--theard)]" />
//         ) : (
//           <FiSun className="h-4 w-4 text-[var(--theard)]" />
//         )}
//       </motion.div>
//       <span className="font-['Dosis']">{theme === 'light' ? 'Dark' : 'Light'}</span>
//     </motion.button>
//   )
// }