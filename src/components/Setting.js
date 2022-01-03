import React from 'react';
import { withRouter } from 'react-router-dom';
import { userVerifyURL, localStorageKey } from '../utils/constant';
import validate from '../utils/validate';

class Setting extends React.Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    bio: this.props.user.bio || '',
    password: this.props.user.password || '',
    image: this.props.user.image || '',
    errors: {
      email: '',
      password: '',
      username: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { username, email, bio, image, password } = this.state;
  //   let storageKey = localStorage[localStorageKey];
  //   fetch(userVerifyURL, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: `Token ${storageKey}`,
  //     },
  //     body: JSON.stringify({ user: { username, email, bio, image, password } }),
  //   })
  //     .then((res) => res.json())
  //     .then(({ user }) => console.log(user));
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, bio, image, password } = this.state;
    let storageKey = localStorage[localStorageKey];
    fetch(userVerifyURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          bio,
          image,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not change user');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({
          username: '',
          email: '',
          bio: '',
          image: '',
          password: '',
        });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { username, email, bio, image, password } = this.state;
    return (
      <>
        <section className="form_section article">
          <div className="container">
            <h1 className="setting_header">Your Setting</h1>
            <form>
              <input
                type="text"
                name="image"
                placeholder="URL of profile picture"
                className="handleinput"
                value={image}
                onChange={this.handleChange}
              />
              <input
                type="username"
                placeholder="username"
                className="handleinput"
                value={username}
                name="username"
                onChange={this.handleChange}
              />
              <textarea
                name="bio"
                id=""
                cols="30"
                rows="10"
                placeholder="Short bio about you"
                className="handleinput"
                value={bio}
                onChange={this.handleChange}
              ></textarea>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="handleinput"
                value={email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="handleinput"
                value={password}
                onChange={this.handleChange}
              />
              <div className="btn_sec">
                <input
                  className="btn_secondary"
                  value="Update Setting"
                  type="submit"
                  onClick={this.handleSubmit}
                />
              </div>
              <div className="btn_sec">
                <button
                  className="btn_secondary"
                  onClick={() => {
                    this.props.logout();
                    this.props.history.push('/');
                  }}
                >
                  Log Out
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Setting);
