import axios from "axios";
import { toast } from "react-toastify";
import {
  BookingSliceState,
  IBooking,
  ICreateSubmittedBooking,
} from "../../../types/types";
import { getBookingAndPlayersActionCreator } from "../../features/bookingSlice";
import {
  createBookingActionCreator,
  deleteBookingActionCreator,
  loadBookingsActionCreator,
} from "../../features/bookingsSlice";
import { AppDispatch } from "../../store";

interface AxiosGetBookingsResponse {
  bookings: IBooking[];
}

interface AxiosCreateBookingResponse {
  createdBooking: IBooking;
}

const getAuthData = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const loadBookingsThunk =
  (
    limit: number,
    page: number,
    type: string,
    status: string,
    date: string,
    user: string,
    owner: string
  ) =>
  async (dispatch: AppDispatch) => {
    const typeParam = type ? `&type=${type}` : "";
    const statusParam = status ? `&status=${true}` : "";
    const dateParam = date ? `&date=${date}` : "";
    const userParam = user ? `&user=${user}` : "";
    const ownerParam = owner ? `&owner=${owner}` : "";

    const params =
      typeParam || statusParam || dateParam || userParam || ownerParam
        ? "?" + typeParam + statusParam + dateParam + userParam + ownerParam
        : "";

    const url: string = `${process.env.REACT_APP_API_URL}bookings/limit=${limit}&page=${page}${params}`;

    const loadToastId = toast.loading("Cargando contenido...", {
      isLoading: true,
      type: "default",
      position: "top-center",
      closeOnClick: true,
    });

    const {
      data: { bookings },
    } = await axios.get<AxiosGetBookingsResponse>(url, getAuthData());

    dispatch(loadBookingsActionCreator(bookings));

    toast.update(loadToastId, {
      type: toast.TYPE.DEFAULT,
      isLoading: false,
      autoClose: 50,
      closeOnClick: true,
    });
  };

export const deleteBookingThunk =
  (bookingIdToDelete: string) => async (dispatch: AppDispatch) => {
    const url: string = `${process.env.REACT_APP_API_URL}bookings/${bookingIdToDelete}`;
    try {
      const {
        status,
        data: { msg },
      } = await axios.delete(url, getAuthData());

      if (status === 200) {
        dispatch(deleteBookingActionCreator(bookingIdToDelete));
        toast.success("Reserva eliminada");
      }

      if (status === 404) {
        toast.error(msg);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

export const createBookingThunk =
  (submittedNewBookingData: ICreateSubmittedBooking) =>
  async (dispatch: AppDispatch) => {
    const createBookingToastId = toast.loading("Creando reserva...", {
      type: "default",
      isLoading: true,
      position: "top-center",
    });
    const url: string = `${process.env.REACT_APP_API_URL}bookings/create`;
    const {
      data: { createdBooking },
    } = await axios.post<AxiosCreateBookingResponse>(
      url,
      submittedNewBookingData,
      getAuthData()
    );

    dispatch(createBookingActionCreator(createdBooking));
    toast.update(createBookingToastId, {
      render: `Reserva creada con éxito`,
      type: "success",
      isLoading: false,
      autoClose: 800,
    });
  };

export const editBookingThunk =
  (submittedUpdatedBookingData: ICreateSubmittedBooking, id: string) =>
  async (dispatch: AppDispatch) => {
    const updateToastId = toast.loading("Actualizando reserva...", {
      type: "default",
      isLoading: true,
      position: "top-center",
    });
    const url: string = `${process.env.REACT_APP_API_URL}bookings/edit/${id}`;
    await axios.put<AxiosCreateBookingResponse>(
      url,
      submittedUpdatedBookingData,
      getAuthData()
    );

    toast.update(updateToastId, {
      render: `Reserva actualizada con éxito`,
      type: "success",
      isLoading: false,
      autoClose: 800,
    });
    dispatch(
      getBookingAndPlayersActionCreator({
        booking: {
          id: "",
          club: "",
          owner: "",
          date: "",
          hour: "",
          courtType: "",
          players: [],
          open: true,
        },
        playersUsernames: [],
      })
    );
  };

export const addUserToBookingPlayersThunk =
  (id: string, players: string[]) => async (dispatch: AppDispatch) => {
    const updateToastId = toast.loading("Añadiendote a la reserva...", {
      type: "default",
      isLoading: true,
      position: "top-center",
    });

    const repeatedPlayer = players
      .slice(0, -1)
      .includes(players[players.length - 1]);

    if (repeatedPlayer) {
      toast.update(updateToastId, {
        render: `No te puedes añadir a una reserva en la que ya estás!`,
        type: "error",
        isLoading: false,
        autoClose: 800,
        closeOnClick: true,
      });
      return;
    }

    const url: string = `${process.env.REACT_APP_API_URL}bookings/edit/addplayer/${id}`;
    try {
      await axios.put<AxiosCreateBookingResponse>(url, players, getAuthData());

      toast.update(updateToastId, {
        render: `Has sido añadido a esta reserva!`,
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });
      dispatch(getBookingAndPlayersUsernamesThunk(id));
    } catch (error: any) {
      toast.update(updateToastId, {
        render: `Error al añadirte a la reserva`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

export const removeUserFromBookingPlayersThunk =
  (id: string, players: string[]) => async (dispatch: AppDispatch) => {
    const url: string = `${process.env.REACT_APP_API_URL}bookings/edit/addplayer/${id}`;

    await axios.put<AxiosCreateBookingResponse>(url, players, getAuthData());
    toast.success("Te has eliminado con éxito de ésta reserva");
  };

export const getBookingAndPlayersUsernamesThunk =
  (requestedBookingId: string) => async (dispatch: AppDispatch) => {
    const url: string = `${process.env.REACT_APP_API_URL}bookings/detail/${requestedBookingId}`;

    const getOneBookingToastId = toast.loading(
      "Cargando datos de la reserva...",
      {
        isLoading: true,
        type: "default",
        position: "top-center",
        closeOnClick: true,
      }
    );

    const {
      data: { booking, playersUsernames },
    } = await axios.get<BookingSliceState>(url, getAuthData());

    dispatch(getBookingAndPlayersActionCreator({ booking, playersUsernames }));

    toast.update(getOneBookingToastId, {
      type: toast.TYPE.DEFAULT,
      isLoading: false,
      autoClose: 50,
    });
  };
