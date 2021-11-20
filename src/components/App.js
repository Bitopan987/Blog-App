import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';
import SinglePost from './SinglePost';

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/article/:slug" component={SinglePost}></Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
