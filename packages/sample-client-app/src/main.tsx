import { Liff } from '@line/liff'
import { buildNiseLiff } from '@niseline/niseliff'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './main.css'

declare global {
  interface Window {
    liff: Liff
  }
}

window.liff = buildNiseLiff() as Liff

window.liff
  .init({
    liffId: 'DEFAULT_LIFF_ID',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
