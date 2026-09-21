import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Awards', href: '#awards' },
  { name: 'Contact', href: '#contact' },
]

// A section becomes active once its top passes this fraction of the viewport
// height. Must stay below the anchor-scroll offset (5rem) so a nav click lands
// on the section it targeted.
const ACTIVE_LINE_RATIO = 0.35

const Navbar = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)

  useEffect(() => {
    // Empty on pages without these sections (e.g. /projects/[slug]), so
    // nothing is highlighted there.
    const sections = NAV_ITEMS.map(({ href }) => ({
      href,
      element: document.querySelector(href),
    }))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const line = window.innerHeight * ACTIVE_LINE_RATIO
      let current: string | null = null
      for (const { href, element } of sections) {
        if (element && element.getBoundingClientRect().top <= line) {
          current = href
        }
      }

      // The last section can be too short to ever reach the line.
      const last = sections[sections.length - 1]
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom && last.element) current = last.href

      setActiveHref(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToSection = (href: string) => {
    if (router.pathname === '/') {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/${href}`)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      layoutRoot
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-blur shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              <Image
                src="/images/Me-logo-New.png"
                alt="VANN Seavlong Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activeHref
                return (
                  <div key={item.name} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.href)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`hover:text-primary transition-colors duration-300 font-medium ${isActive ? 'text-primary' : 'text-gray-700'
                        }`}
                    >
                      {item.name}
                    </motion.button>
                    {/* Shared layoutId: framer slides this one line between items */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-line"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="py-4 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activeHref
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block w-full text-left px-4 py-2 border-l-2 hover:text-primary hover:bg-gray-50 transition-colors duration-300 ${isActive
                      ? 'text-primary font-semibold border-primary'
                      : 'text-gray-700 border-transparent'
                      }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
