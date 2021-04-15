import "./login.style.scss";
import LoginInput from "../../components/input/LoginInput.component";
import Btn from "../../components/btn/Btn.component";

const Login = () => {
  return (
    <div className="login flex flex-fw-w jc-c ai-c">
      <form action="" className="login__form">
        <h2 className="fs-bigger">Log in to Twitter</h2>
        <LoginInput
          inputName="Email"
          type="email"
          ctrlClass="email"
        ></LoginInput>
        <LoginInput
          inputName="Password"
          type="password"
          ctrlClass="password"
        ></LoginInput>
        <Btn url="#!" text="Log In" block></Btn>
      </form>
    </div>
  );
};

export default Login;
