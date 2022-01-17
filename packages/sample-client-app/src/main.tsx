import { buildNiseLiff } from '@niseline/niseliff'
import React from 'react'
import ReactDOM from 'react-dom'

const niseliff = buildNiseLiff()

niseliff
  .init({
    liffId: 'DEFAULT_LIFF_ID',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>Sample client app</React.StrictMode>,
      document.getElementById('root')
    )
  })
