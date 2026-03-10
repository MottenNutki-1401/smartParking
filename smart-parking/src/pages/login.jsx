import "../styles/login.css";
//import Register from "./register.jsx";

function Login({ onLogin, onShowRegister }) {
  return (
    <div className="login-container">
      <h1>Hello there!</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }} >
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <p>
        No account?{" "}
        <button type="button" onClick={onShowRegister}>
          Register
        </button>
      </p>
      
    </div>
   
  );

 
}

export default Login;