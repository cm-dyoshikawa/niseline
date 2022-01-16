import clientSdk from 'client-sdk'
import React from 'react'
import ReactDOM from 'react-dom'

clientSdk
  .init({
    liffId: 'dummy',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>Sample client app</React.StrictMode>,
      document.getElementById('root')
    )
  })
