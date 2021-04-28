import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from './components/AuthPage/Auth';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
