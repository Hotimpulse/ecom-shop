import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IProtectedRoute {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === "unauthorized") {
      navigate("/login");
    }
  }, [status, navigate]);

  return <>{children}</>;
}
