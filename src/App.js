import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FetchNormal from './components/FetchNormal';
import FetchWithAuth from './components/FetchWithAuth';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/signup'
import Home from "./components/gettingStarted"
import NavBar from './components/NavBar';
import Login from './components/login';
function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/fetch_normal" component = {FetchNormal} />
      <PrivateRoute path="/fetch_with_auth" component={FetchWithAuth}></PrivateRoute>
    </Switch>
    </>

  );
}

export default App;
