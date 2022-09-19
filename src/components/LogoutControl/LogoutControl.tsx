import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutActionCreator } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

interface Props {
  children: JSX.Element;
}

const LogoutControl = ({ children }: Props): JSX.Element | any => {
  const { logged } = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logged && token) navigate("/bookings");
  }, [logged, navigate, token]);

  if (!logged) {
    return children;
  }

  if (logged && !token) {
    dispatch(logOutActionCreator());
    return children;
  }
  return null;
};

export default LogoutControl;
