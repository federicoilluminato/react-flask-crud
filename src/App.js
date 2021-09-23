import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Users from './components/Users';
import Navbar from './components/Navbar'
import Clientes from './components/Clientes';
import Planes from './components/Planes';

function App() {
  return (
    <Router>
      <Navbar/>
    <div className="container p-4 mw-100">
      <Switch>
        <Route path="/clientes" component={Clientes}/>
        <Route path="/users" component={Users}/>
        <Route path="/planes" component={Planes}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
