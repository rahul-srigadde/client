import React from 'react'
import { ToastMessage } from './ToastMessage'

export const ToastMessageWrapper = (props) => {
  const handleClose = () => {
    props.setState({ ...props.state, open: false })
  }

  const demo = {
    content: props.state.message,
    successpopup: props.state.type === 'success' ? true : false,
  }

  return (
    <>
      <ToastMessage
        open={props.state.open}
        props={demo}
        handleClose={handleClose}
      />
    </>
  )
}

/**
 *  usage : -
 *
 *  <Button
 *    onClick={() => { setToastState('success', 'Success!!', true) }}
 *  >
 *  Hi!
 *  </Button>
 *
 */
