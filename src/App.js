import './App.scss';
import React, { useRef } from 'react';
import { UserRegister } from './components/UserRegister';
import { Typography } from '@material-ui/core';
import { GlobalLoader } from './components/common/GlobalLoader';
import { ToastMessageWrapper } from './components/common/ToastMessageWrapper';

export const loaderContext = React.createContext((show) => {
  console.log(show)
})
export const toastContext = React.createContext(
  (type, message, open) => {
    console.log(type, message, open)
  },
)
export const App = () => {
  const loadingRef = useRef(0)
  // This will be passes as a context so that the loader is visible
  const toggleLoader = (show) => {
    const loaderWrapper = document.getElementById('loader_wrapper',)
    if (show) {
      // tslint:disable-next-line: no-object-mutation
      loadingRef.current = loadingRef.current + 1
    } else {
      if (loadingRef && loadingRef.current) {
        // tslint:disable-next-line: no-object-mutation
        loadingRef.current = loadingRef.current - 1
      }
    }
    if (loaderWrapper && loadingRef) {
      if (
        loadingRef.current &&
        loaderWrapper.classList.contains('hide_loader')
      ) {
        loaderWrapper.classList.remove('hide_loader')
        document.body.classList.add('scroll_lock')
      } else if (
        !loadingRef.current &&
        !loaderWrapper.classList.contains('hide_loader')
      ) {
        loaderWrapper.classList.add('hide_loader')
        document.body.classList.remove('scroll_lock')
      }
    }
  }
  const [toastState, setToastState] = React.useState({
    type: 'success',
    message: 'Success!!',
    open: false,
  })
  // This will be passed as a context so that the toast can be rendered.
  const renderToast = (type, message, open) => {
    setToastState({
      type,
      message,
      open,
    })
  }
  return (
    <loaderContext.Provider value={toggleLoader}>
      <toastContext.Provider value={renderToast}>
        <ToastMessageWrapper
          state={toastState}
          setState={setToastState}
        />
        <UserRegister />
        <Typography
          component="div"
          id="loader_wrapper"
          className={'hide_loader'}
        >
          <GlobalLoader />
        </Typography>
      </toastContext.Provider>
    </loaderContext.Provider>
  );
}

