import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import Web3Modal from 'web3modal'
import useBalance from '../hooks/useBalance'
import useProvider from '../hooks/useProvier'
import './App.scss'
import Create from './Create'
import Marketplace from './Marketplace'
import Sell from './Sell'

function App() {
  const { pathname } = useLocation()
  const history = useHistory()
  const activeIndex =
    pathname === '/marketplace' ? 0 : pathname === '/sell' ? 1 : pathname === '/create' ? 2 : undefined
  const { t } = useTranslation()
  const [lng, setLng] = useState('en-US')
  const provider = useProvider()
  const balance = useBalance()
  console.log('balance', balance)

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
  }

  useEffect(() => {
    const lng = window.localStorage.getItem('lng')
    if (lng === 'ja-JP') {
      i18next.changeLanguage(lng, (err) => {
        if (err) return console.error(err)
      })
      setLng(lng)
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div style={{ flex: 1 }} />
        <nav className="nav">
          <ul>
            <li tabIndex="0" className={activeIndex === 0 ? 'active' : ''} onClick={() => history.push('/marketplace')}>
              {t('Marketplace')}
            </li>
            <li tabIndex="0" className={activeIndex === 1 ? 'active' : ''} onClick={() => history.push('/sell')}>
              {t('Sell')}
            </li>
            <li tabIndex="0" className={activeIndex === 2 ? 'active' : ''} onClick={() => history.push('/create')}>
              {t('Create')}
            </li>
          </ul>
        </nav>
        <div className="lng-and-account">
          <div
            tabIndex="0"
            className="lng"
            onClick={() => {
              const lng = window.localStorage.getItem('lng')
              if (lng === 'en-US') {
                i18next.changeLanguage('ja-JP', (err) => {
                  if (err) return console.error(err)
                })
                window.localStorage.setItem('lng', 'ja-JP')
                setLng('ja-JP')
              } else {
                i18next.changeLanguage('en-US', (err) => {
                  if (err) return console.error(err)
                })
                window.localStorage.setItem('lng', 'en-US')
                setLng('en-US')
              }
            }}
          >
            {lng === 'ja-JP' ? '日本語' : 'EN'}
          </div>
          {
            balance !== '0' ? (
              <div tabIndex="0" className="account">
                {balance}
              </div>
            ) : (
              <div tabIndex="0" className="account" onClick={connectWallet}>
                {t('Connect Metamask')}
              </div>
            )
          }
        </div>
      </header>
      <div className="app-body">
        <Switch>
          <Route exact strict path="/marketplace" component={Marketplace} />
          <Route exact strict path="/sell" component={Sell} />
          <Route exact strict path="/create" component={Create} />
          <Route component={() => <Redirect to="/marketplace" />} />
        </Switch>
      </div>
    </div>
  )
}

export default App
