import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Auth from './components/AuthPage/Auth';
import PostList from "./components/PostPage/PostList";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, remindProcess } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/posts">
          {remindProcess ? null : user ? <PostList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/">
          {remindProcess ? null : user ? <Redirect to="/posts" /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
