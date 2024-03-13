import React from 'react'

export const Success = () => {
  const gohome = () => {
    window.location.href = '/'
  }
  return (
    <>
    <div>success</div>
    <button onClick={gohome}>Home page </button>
    </>
  )
}
