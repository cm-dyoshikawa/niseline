import clientSdk from 'client-sdk'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

clientSdk
  .init({
    liffId: 'dummy',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
