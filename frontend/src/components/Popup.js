import React from 'react'
import './Popup.css'

function Popup(props) {
  return (props.trigger) ? (
    <>
        <div className='popup-inner'>
          <div className='row justify-content-end m-1'>
            <button onClick={()=>{
                props.setTrigger(false)
            }} className='btn btn-light btn-close'></button>
            </div>
            {props.children}
        </div>

      
    </>
  ) : "";
}

export default Popup
