import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Switch>
        <Route exact strict path="/" component={() => <div>Home</div>} />
        <Route exact strict path="/about" component={() => <div>About</div>} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}

export default App
