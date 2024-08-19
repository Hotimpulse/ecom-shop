import DefaultButton from "@src/ui/Buttons/DefaultButton";
import login from "./login.module.scss";

export default function Login() {
  function handleLogin(): void {}

  return (
    <div className={login.wrapper}>
      <h1 className={login.heading}>Sign in</h1>
      <div className={login.container}>
        <input
          placeholder="Login"
          type="email"
          autoComplete="email"
          className={login.email_input}
        />
        <input
          placeholder="Password"
          type="password"
          className={login.password_input}
        />
        <DefaultButton
          children={"Sign in"}
          onClick={handleLogin}
        ></DefaultButton>
      </div>
    </div>
  );
}
