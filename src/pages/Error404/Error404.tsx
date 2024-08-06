import DefaultButton from "@src/ui/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="flex max-w-[600px] justify-center m-auto items-center p-2">
      <div className="grid gap-4 align-middle place-items-center text-center grid-cols-2">
        <DefaultButton onClick={() => navigate("/")} children={"Главная"} />
      </div>
    </div>
  );
}
