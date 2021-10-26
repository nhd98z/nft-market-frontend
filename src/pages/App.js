import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Marketplace from './Marketplace'
import Sell from './Sell'
import Create from './Create'

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
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
