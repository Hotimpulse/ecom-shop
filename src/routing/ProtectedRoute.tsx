import { RootState } from "@src/store/store";
import Spinner from "@src/ui/Spinner/Spinner";
import getAuthToken from "@src/util/getAuthToken";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const navigate = useNavigate();
  const { user, status } = useSelector((store: RootState) => store.user);

  const [token, setToken] = useState<string | null>(getAuthToken());

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = getAuthToken();
      setToken(newToken);
      if (!newToken) {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (!token && user.id === null) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  if (status === "loading") return <Spinner />;

  return <>{children}</>;
}
