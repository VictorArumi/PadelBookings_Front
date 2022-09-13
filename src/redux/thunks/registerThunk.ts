import axios from "axios";
import { toast } from "react-toastify";
import { IRegisterForm } from "../../types/types";
import { registerActionCreator } from "../features/userSlice";
import { AppDispatch } from "../store";

interface RegisterApiResponse {
  username: string;
}

const registerThunk =
  (userData: FormData | IRegisterForm) => async (dispatch: AppDispatch) => {
    const registerToastId = toast.loading("Creando cuenta...", {
      type: "default",
      isLoading: true,
      position: "top-center",
    });

    const url: string = `${process.env.REACT_APP_API_URL}user/register`;

    try {
      const {
        data: { username },
      } = await axios.post<RegisterApiResponse>(url, userData);

      dispatch(registerActionCreator({ username }));
      toast.update(registerToastId, {
        render: `Creada nueva cuenta con usuario ${username}, ya puedes iniciar sesión`,
        type: "success",
        isLoading: false,
        autoClose: 800,
        closeOnClick: true,
      });
    } catch (error: any) {
      toast.update(registerToastId, {
        render: `Error en el registro: ${error.response.data.msg}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });

      return "Error en el registro";
    }
  };

export default registerThunk;
