import React from 'react'

export default function Container({children}: any) {
  return (
    <div className='px-5 max-w-7xl mx-auto'>
      {children}
    </div>
  )
}
