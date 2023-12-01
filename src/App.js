import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
