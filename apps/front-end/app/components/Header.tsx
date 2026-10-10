'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import './Header.css'

/**
 * Header with Navigator
 *
 * @return {*}
 */
const Header = () => {
  const pathname = usePathname()

  return (
    <nav className="main-nav">
      <Link
        className={pathname === '/estimator' ? 'active' : ''}
        href="/estimator"
      >
        Property Value Estimator
      </Link>
      <Link className={pathname === '/market' ? 'active' : ''} href="/market">
        Property Market Analysis
      </Link>
    </nav>
  )
}

export default Header
