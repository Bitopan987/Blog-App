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
import Profile from './Profile';
import Setting from './Setting';
import PostEdit from './PostEdit';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
    article: null,
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

  logout = () => {
    this.setState({
      isLoggedIn: false,
      user: null,
      isVerifying: true,
    });
    localStorage.clear();
  };

  editArticleFn = (article) => {
    console.log(article);
    this.setState({
      article,
    });
  };

  render() {
    const { isLoggedIn, user, isVerifying, article } = this.state;
    if (isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            isLoggedIn={isLoggedIn}
            user={user}
            logout={this.logout}
            article={article}
            editArticleFn={this.editArticleFn}
          />
        ) : (
          <UnauthenticatedApp updateUser={this.updateUser} user={user} />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home user={props.user} />
      </Route>
      <Route path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route path="/settings">
        <Setting user={props.user} logout={props.logout} />
      </Route>
      <Route path="/profile/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/article/:slug">
        <SinglePost
          user={props.user}
          isLoggedIn={props.isLoggedIn}
          editArticleFn={props.editArticleFn}
        />
      </Route>
      <Route path="/editor/:slug">
        <PostEdit user={props.user} article={props.article} />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <Signup updateUser={props.updateUser} />
      </Route>
      <Route path="/article/:slug">
        <SinglePost user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
