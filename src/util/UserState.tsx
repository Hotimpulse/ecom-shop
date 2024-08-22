import { AppDispatch } from "@src/store/store";
import { fetchUserInfo } from "@src/store/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserState() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);
  
  return null;
}
