'use client'

import './style.css'

const Link = ({ children, href, onClick = () => {} }) => {
  return (
    <a href={href} onClick={onClick}>{children}</a>
  )
}

export default Link
