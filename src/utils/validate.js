export default function validate(errors, name, value) {
  switch (name) {
    case 'username':
      let usernameError =
        value.length >= 6 ? '' : 'Username can not be less than 6 characters';
      errors.username = usernameError;
      break;
    case 'email':
      let emailError =
        value.indexOf('@') === -1 ? "Email doesn't contain @ " : '';
      errors.email = emailError;
      break;
    case 'password':
      let passwordError;
      if (value.length < 7) {
        passwordError = 'Password can not be less than 6 characters';
      }
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
      if (!re.test(value)) {
        passwordError = 'Password must contain a character and a number';
      }
      errors.password = passwordError;
      break;
    default:
      return errors;
  }
}
