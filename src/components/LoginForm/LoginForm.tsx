import { ChangeEvent, useState } from "react";
import FormStyled from "../RegisterForm/FormStyled";
import "@fontsource/urbanist";

import { ILoginForm } from "../../types/types";
import { useAppDispatch } from "../../redux/store/hooks";
import loginThunk from "../../redux/thunks/loginThunk";

const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const emptyFormValues: ILoginForm = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState<ILoginForm>(emptyFormValues);

  const changeData = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const loginSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(loginThunk(formData));
    setFormData(emptyFormValues);
  };

  return (
    <FormStyled>
      <form className="register-form" autoComplete="off" noValidate>
        <div className="inputs-container">
          <label htmlFor="username">
            Nombre de usuario
            <input
              name="Nombre de usuario"
              id="username"
              value={formData.username}
              onChange={changeData}
            />
          </label>
          <label htmlFor="password">
            Contraseña
            <input
              name="Contraseña"
              id="password"
              type="password"
              value={formData.password}
              onChange={changeData}
            />
          </label>
        </div>
        <button className="submit-button" type="submit" onClick={loginSubmit}>
          Entrar
        </button>
      </form>
    </FormStyled>
  );
};

export default LoginForm;
