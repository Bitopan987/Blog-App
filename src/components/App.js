import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';
import SinglePost from './SinglePost';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { localStorageKey, userVerifyURL } from '../utils/constant';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => console.log({ user }));
    }
  }

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login updateUser={this.updateUser} />
          </Route>
          <Route path="/signup">
            <Signup updateUser={this.updateUser} />
          </Route>
          <Route path="/article/:slug" component={SinglePost} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
