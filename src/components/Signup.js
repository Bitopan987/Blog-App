function Signup() {
  return (
    <section className="form_section">
      <h2>Sign Up</h2>
      <a href="/">
        <p>Have an Account?</p>
      </a>
      <form>
        <input
          className="handleinput"
          name="username"
          type="text"
          placeholder="Username"
        />
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
          <button type="submit">Sign up</button>
        </div>
      </form>
    </section>
  );
}

export default Signup;
