import { useNavigate } from "react-router-dom";

export default function useHandleAnchorClick(hash: string) {
  const navigate = useNavigate();

  return () => {
    navigate(`/`);
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    }, 0);
  };
}
