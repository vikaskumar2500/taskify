import React, { ReactNode } from 'react'

const ClerkLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      {children}
    </div>
  )
}

export default ClerkLayout
