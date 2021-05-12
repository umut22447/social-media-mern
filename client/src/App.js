import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AccountsMain from "./components/AccountPage/AccountsMain";
import Auth from './components/AuthPage/Auth';
import NewPostPage from "./components/NewPostPage.js/NewPostPage";
import PostList from "./components/PostPage/PostList";
import Profile from "./components/ProfilePage/Profile";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, remindProcess } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/posts">
          {remindProcess ? null : user ? <PostList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/new-post">
          {remindProcess ? null : user ? <NewPostPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/accounts/:page">
          {remindProcess ? null : <AccountsMain />}
        </Route>
        <Route exact path="/:username">
          {remindProcess ? null : <Profile />}
        </Route>
        <Route exact path="/">
          {remindProcess ? null : user ? <Redirect to="/posts" /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
