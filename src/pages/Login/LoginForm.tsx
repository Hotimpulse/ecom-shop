import DefaultButton from "@src/ui/Buttons/DefaultButton";
import login from "./login.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store/store";
import { getUserInfo } from "@src/store/user/userSlice";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

enum EFormFieldNames {
  username = "username",
  password = "password",
}

interface IFormData {
  [k: string]: string;
}

interface IUserSignIn {
  username: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});

  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      return;
    }
    navigate("/");
  }, [navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const dataObject: { [k: string]: FormDataEntryValue } = Object.fromEntries(
      data.entries()
    );

    const userData: IUserSignIn = {
      username: dataObject[EFormFieldNames.username].toString(),
      password: dataObject[EFormFieldNames.password].toString(),
    };

    try {
      await dispatch(getUserInfo(userData))
        .unwrap()
        .then((action) => {
          if (action.token) {
            localStorage.setItem("token", action.token);
            toast.success(`Welcome, ${action.firstName}!`);
            navigate("/");
          }
        });
    } catch (error) {
      toast.error("Error logging in! Check your credentials!");
      console.error(error);
    }
  };

  return (
    <div className={login.wrapper}>
      <form ref={ref} onSubmit={handleSubmit}>
        <h1 className={login.heading}>Sign in</h1>
        <div className={login.container}>
          <input
            name={EFormFieldNames.username}
            placeholder="Username"
            type="text"
            className={login.username_input}
            onChange={handleChange}
            value={formData[EFormFieldNames.username] || ""}
          />
          <input
            name={EFormFieldNames.password}
            placeholder="Password"
            type="password"
            className={login.password_input}
            onChange={handleChange}
            value={formData[EFormFieldNames.password] || ""}
          />
          <DefaultButton
            children={"Sign in"}
            type="submit"
            disabled={
              !(
                formData[EFormFieldNames.username] !== "" &&
                formData[EFormFieldNames.password] !== ""
              )
            }
          />
        </div>
      </form>
    </div>
  );
}
