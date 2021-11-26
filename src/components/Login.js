import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';
import { loginURL } from '../utils/constant';
import { withRouter } from 'react-router';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) =>
            this.setState((prevState) => {
              return {
                ...prevState,
                errors: {
                  ...prevState.errors,
                  email: 'Email or Password is incorrect',
                },
              };
            })
          );
          throw new Error('Login is not successful');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ password: '', email: '' });
        this.props.history.push('/');
      })
      .catch((error) => console.log('error'));
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <section className="form_section">
        <h2>Sign In</h2>
        <Link to="/login">
          <p>Need an Account?</p>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <input
            className="handleinput"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
            placeholder="Email"
          />
          <span className="error">{errors.email}</span>
          <input
            className="handleinput"
            name="password"
            type="password"
            onChange={this.handleChange}
            value={password}
            placeholder="Password"
          />
          <span className="error">{errors.password}</span>
          <div className="btn_sec">
            <input
              className="btn_secondary"
              value="Sign In"
              type="submit"
              disabled={errors.email || errors.password}
            />
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(Login);
