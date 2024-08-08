import { useNavigate } from "react-router-dom";

export default function useHandleAnchorClick() {
  const navigate = useNavigate();

  navigate("/");
  setTimeout(() => {
    const element = document.querySelector("hash");
    if (element) {
      element.scrollIntoView();
    }
  }, 0);
}
