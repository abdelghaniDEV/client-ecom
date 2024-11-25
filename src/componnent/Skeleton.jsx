import React from 'react'

function Skeleton({className}) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-300 ${className && className}`}></div>
  )
}

export default Skeleton