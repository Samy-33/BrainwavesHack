import React from 'react'
import ReactLoading from 'react-loading'
import './style.css'

const throbber = (props) => {
  return (
    <div className="throbber">
      <ReactLoading type="spinningBubbles" color="#000"></ReactLoading>
    </div>
  )
}

export default throbber