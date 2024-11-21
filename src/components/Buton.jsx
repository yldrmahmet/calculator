import React from 'react'

const Buton = (props) => {
  return (
    <button id={props.id} className='fs-5'>{props.name}</button>
  )
}

export default Buton