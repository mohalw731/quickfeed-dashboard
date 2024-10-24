import React from 'react'

export default function Container({children}: any) {
  return (
    <div className='max-w-7xl px-5 mx-auto'>
      {children}
    </div>
  )
}
