'use client';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from './i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = pathname.split('/')[1] || 'en';

  const handleChange = (lang: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 !px-4 !py-2 rounded-lg bg-[var(--input-bg)] 
        border cursor-pointer border-[var(--border)] text-[var(--text)] hover:bg-[var(--main)] 
        transition-colors duration-300 shadow-lg hover:shadow-[var(--border)]/20"
        whileTap={{ scale: 0.98 }}
      >
        <FaGlobe className="text-[var(--theard)]" />
        <span className="font-['Dosis']">{currentLang.toUpperCase()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoChevronDown className="text-[var(--theard)]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 !mt-2 w-full bg-[var(--main)] 
            border border-[var(--border)] rounded-lg shadow-lg overflow-hidden z-50"
          >
            {locales.map((lang) => (
              <motion.button
                key={lang}
                onClick={() => handleChange(lang)}
                className="w-full cursor-pointer !px-4 !py-2 text-left text-[var(--text)] 
                bg-[var(--main)] transition-colors duration-200 font-['Dosis']"
                whileHover={{ x: 2 }}
              >
                {lang.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
