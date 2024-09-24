import DefaultButton from "@src/ui/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";
import error from "./error.module.scss";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className={error["error-wrapper"]}>
      <div className={error.container}>
        <h1 className={error.heading}>404</h1>
        <DefaultButton onClick={() => navigate("/")} children={"Back to main"} type={"button"} disabled={false} ariaLabel={"Back to main button"} />
      </div>
    </div>
  );
}
