'use client'

import { KeyboardEvent, ReactNode, useState } from 'react'

type TabItem = {
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultIndex?: number
}

/**
 * Tabs
 *
 * @param {TabsProps} { tabs, defaultIndex = 0 }
 * @return {*}
 */
const Tabs = ({ tabs, defaultIndex = 0 }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setActiveIndex((index + 1) % tabs.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setActiveIndex((index - 1 + tabs.length) % tabs.length)
    }
  }

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Property tabs"
        className="flex border-b border-gray-200"
      >
        {tabs.map(({ label }, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={label}
              role="tab"
              id={`tab-${index}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-600" />
              )}
            </button>
          )
        })}
      </div>

      {tabs.map(({ label, content }, index) => (
        <div
          key={label}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeIndex}
          className="py-4"
        >
          {index === activeIndex && content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
