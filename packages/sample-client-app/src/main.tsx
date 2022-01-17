import { buildClientSdk } from 'niseliff-sdk'
import React from 'react'
import ReactDOM from 'react-dom'

const clientSdk = buildClientSdk()

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
