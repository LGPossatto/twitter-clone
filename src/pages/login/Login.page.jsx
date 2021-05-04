import { useState } from "react";

import "./login.style.scss";
import LoginForm from "../../components/login-form/LoginForm.component";
import SigninForm from "../../components/signin-form/SigninForm.component";

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login flex flex-fd-c flex-fw-w jc-c ai-c">
      {signIn ? <SigninForm></SigninForm> : <LoginForm></LoginForm>}
      <span className="fs-small fc-primary" onClick={() => setSignIn(!signIn)}>
        {signIn ? "Log in to Twitter" : "Create an Account"}
      </span>
    </div>
  );
};

export default Login;
