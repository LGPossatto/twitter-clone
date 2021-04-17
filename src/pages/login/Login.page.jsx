import { useState, useContext } from "react";

import UserContext from "../../context/user/userContext";

import "./login.style.scss";
import Form from "../../components/form/Form.component";

const Login = () => {
  const { createAccount, loginWithEmail } = useContext(UserContext);

  const [signIn, setSignIn] = useState(false);

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  return (
    <div className="login flex flex-fd-c flex-fw-w jc-c ai-c">
      {signIn ? (
        <Form
          title="Create an Account"
          btnText={"Sign In"}
          onSubmit={createAccount}
          emailState={logInEmail}
          setEmailState={setLogInEmail}
          passwordState={logInPassword}
          setPasswordState={setLogInPassword}
        ></Form>
      ) : (
        <Form
          title="Log in to Twitter"
          btnText={"Login In"}
          onSubmit={loginWithEmail}
          emailState={signInEmail}
          setEmailState={setSignInEmail}
          passwordState={signInPassword}
          setPasswordState={setSignInPassword}
        ></Form>
      )}
      <span className="fs-small fc-primary" onClick={() => setSignIn(!signIn)}>
        {signIn ? "Log in to Twitter" : "Create an Account"}
      </span>
    </div>
  );
};

export default Login;
