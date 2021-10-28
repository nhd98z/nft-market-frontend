import 'inter-ui/inter.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
