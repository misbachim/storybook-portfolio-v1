import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';

export default function Modal({ content, }) {
  return ReactDom.createPortal(
    <>
      <input className="modal-state" id={content.key} type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor={content.key}></label>
        <ModalBody className="modal-body">
          {content}
        </ModalBody>
      </div>
    </>
    ,
    document.getElementById('portal')
  )
}

const ModalBody = styled.div`
  overflow: auto;
  max-height: 90vh;
`
