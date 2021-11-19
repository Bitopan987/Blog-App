import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';

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
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <section className="form_section">
        <h2>Sign In</h2>
        <Link href="/">
          <p>Need an Account?</p>
        </Link>
        <form>
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

export default Login;
