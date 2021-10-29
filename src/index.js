import 'inter-ui/inter.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './pages/App'
import rootReducer from './states'
import './i18n.js'

window.store = rootReducer.getState()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={rootReducer}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
