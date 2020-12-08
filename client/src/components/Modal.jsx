import React from 'react';

const Modal = (props) => {
  function renderButtons() {
    return props.buttons.map((button, index) => {
      return <button key={index} onClick={button.callback}>{button.text}</button>
    })
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-window'>
      <div className='modal-message' dangerouslySetInnerHTML={{__html: props.message}}></div>
        {props.buttons && <div className='modal-buttons'>{renderButtons()}</div>}
      </div>
    </div>
  )
}

export default Modal;