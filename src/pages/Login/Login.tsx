import DefaultButton from "@src/ui/Buttons/DefaultButton";
import login from "./login.module.scss";

export default function Login() {
  return (
    <div className={login.wrapper}>
      <h1 className={login.heading}>Sign in</h1>
      <div className={login.container}>
        <input placeholder="Login" type="text" className={login.email_input} />
        <input
          placeholder="Password"
          type="text"
          className={login.password_input}
        />
        <DefaultButton children={"Sign in"}></DefaultButton>
      </div>
    </div>
  );
}
