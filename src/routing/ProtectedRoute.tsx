import { RootState } from "@src/store/store";
import Spinner from "@src/ui/Spinner/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const navigate = useNavigate();
  const { user, status } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const isAuth = localStorage.getItem("token");

    if (!isAuth && status !== "Loading" && user.id === null) {
      navigate("/login");
    }
  }, [navigate, status, user]);

  if (status === "Loading") return <Spinner />;

  return children;
}
