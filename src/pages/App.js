import './App.scss'
import { Redirect, Route, Switch } from 'react-router-dom'
import Marketplace from './Marketplace'
import Sell from './Sell'
import Create from './Create'
import { useHistory, useLocation } from 'react-router'

function App() {
  const { pathname } = useLocation()
  const history = useHistory()
  console.log(`pathname`, pathname)
  const activeIndex =
    pathname === '/marketplace' ? 0 : pathname === '/sell' ? 1 : pathname === '/create' ? 2 : undefined
  return (
    <div className="app">
      <header className="header">
        <div />
        <nav className="nav">
          <ul>
            <li className={activeIndex === 0 ? 'active' : ''} onClick={() => history.push('/marketplace')}>
              Marketplace
            </li>
            <li className={activeIndex === 1 ? 'active' : ''} onClick={() => history.push('/sell')}>
              Sell
            </li>
            <li className={activeIndex === 2 ? 'active' : ''} onClick={() => history.push('/create')}>
              Create
            </li>
          </ul>
        </nav>
        <div class="account"></div>
      </header>
      <Switch>
        <Route exact strict path="/marketplace" component={Marketplace} />
        <Route exact strict path="/sell" component={Sell} />
        <Route exact strict path="/create" component={Create} />
        <Route component={() => <Redirect to="/marketplace" />} />
      </Switch>
    </div>
  )
}

export default App
