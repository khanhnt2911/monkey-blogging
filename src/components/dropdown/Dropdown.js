import React, {useState} from 'react'
import {DropdownProvider} from './DropdownContext'

const Dropdown = ({
  placeholder = 'Please select an option',
  children,
  ...props
}) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  )
}

export default Dropdown
