import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
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

  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    const { email, username, password, errors } = this.state;
    return (
      <section className="form_section">
        <h2>Sign Up</h2>
        <Link href="/">
          <p>Have an Account?</p>
        </Link>
        <form>
          <input
            className="handleinput"
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
          <span className="error">{errors.username}</span>
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
              value="Sign Up"
              type="submit"
              disabled={errors.email || errors.password || errors.username}
            />
          </div>
        </form>
      </section>
    );
  }
}

export default Signup;
