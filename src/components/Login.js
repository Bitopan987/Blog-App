function Login() {
  return (
    <section className="form_section">
      <h2>Sign In</h2>
      <a href="/">
        <p>Need an Account?</p>
      </a>
      <form>
        <input
          className="handleinput"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="handleinput"
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="btn_sec">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
