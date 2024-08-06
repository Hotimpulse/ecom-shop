import DefaultButton from "@src/ui/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";
import error from "./error.module.css";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className={error["error-wrapper"]}>
      <div className={error.container}>
        <h1>404</h1>
        <DefaultButton onClick={() => navigate("/")} children={"Главная"} />
      </div>
    </div>
  );
}
