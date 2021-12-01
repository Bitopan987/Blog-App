import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';
import SinglePost from './SinglePost';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { localStorageKey, userVerifyURL } from '../utils/constant';
import FullPageSpinner from './FullPageSpinner';
import NewPost from './NewPost';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
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
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
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
          <Route path="new-post">
            <NewPost />
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
