import "../styles/login.css";

function Register({ onRegister }) {
  return (
    <div className="Register-container">
      <h1>Create Account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;