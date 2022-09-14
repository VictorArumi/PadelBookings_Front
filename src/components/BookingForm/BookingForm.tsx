import { ChangeEvent, useEffect, useState } from "react";
import "@fontsource/urbanist";

import { IBooking, ICreateBookingForm } from "../../types/types";
import { useAppDispatch } from "../../redux/store/hooks";
import {
  createBookingThunk,
  editBookingThunk,
} from "../../redux/thunks/bookingsThunks/bookingsThunks";
import { useNavigate } from "react-router-dom";
interface Props {
  booking: IBooking;
  usernames: string[];
}

const BookingForm = ({
  booking: { owner, club, date, hour, courtType, players, open, id: bookingId },
  usernames,
}: Props): JSX.Element => {
  const editMode = bookingId ? true : false;

  const initialFormValues: ICreateBookingForm = {
    owner: owner,
    club: club,
    date: date,
    hour: hour,
    courtType: courtType,
    player1: players[0],
    player2: players[1],
    player3: players[2],
    player4: players[3],
    players: players,
    open: open,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);

  const [openBooking, toggleOpenBooking] = useState(true);
  const openToggleClass = "transform translate-x-5";

  const checkIfBookingIsFull = () =>
    inputsData.player2 && inputsData.player3 && inputsData.player4;

  const displayedBookingStatus = () => {
    if (openBooking) {
      return checkIfBookingIsFull() ? "cerrada" : "abierta";
    }
    return "cerrada";
  };

  const [currentCourtType, toggleCourtType] = useState(true);
  const toggleButtonsClass = " bg-customblue";

  const [inputsData, setInputsData] =
    useState<ICreateBookingForm>(initialFormValues);

  const changeData = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    setInputsData({
      ...inputsData,
      [event.target.id]: event.target.value,
    });
  };

  const createBookingSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      owner: inputsData.owner,
      club: inputsData.club,
      date: inputsData.date,
      hour: inputsData.hour,
      courtType: currentCourtType ? "Indoor" : "Outdoor",
      players: [
        inputsData.player1,
        inputsData.player2,
        inputsData.player3,
        inputsData.player4,
      ].filter((player) => player !== "" && typeof player !== "undefined"),
      open: checkIfBookingIsFull() ? false : openBooking,
    };

    if (editMode) {
      dispatch(editBookingThunk(formData, bookingId));
      setTimeout(() => navigate(-1), 1000);
      return;
    }

    dispatch(createBookingThunk(formData));
    setTimeout(() => navigate("/bookings"), 1000);
  };

  const submitEnabled =
    inputsData.owner &&
    inputsData.club &&
    inputsData.date &&
    inputsData.hour &&
    inputsData.courtType;

  useEffect(() => {
    submitEnabled
      ? setSubmitButtonDisabled(false)
      : setSubmitButtonDisabled(true);
  }, [submitEnabled]);

  return (
    <div className="flex bg-white w-100m items-center justify-center ">
      <form
        className="flex flex-col justify-center mt-3"
        autoComplete="off"
        noValidate
      >
        <div className="inputs-container">
          <label
            htmlFor="club"
            className="block mb-2 text-m font-medium text-black"
          >
            Club
          </label>
          <select
            onChange={changeData}
            id="club"
            className="bg-customblue/20 mb-2 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
          >
            <option defaultValue={club}>{club}</option>
            <option value="RCTB">RCTB-1899</option>
            <option value="Vall Parc">Vall Parc Club Esportiu</option>
            <option value="Wi Padel">Wi Padel</option>
          </select>
          <label
            htmlFor="date"
            className="block mb-2 text-m font-medium text-black"
          >
            Fecha
            <input
              className="bg-customblue/20 mb-2 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
              id="date"
              type="date"
              value={inputsData.date}
              onChange={changeData}
            />
          </label>
          <label
            htmlFor="hour"
            className="block mb-2 text-m font-medium text-black"
          >
            Hora
            <input
              className="bg-customblue/20 mb-2 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
              id="hour"
              type="time"
              value={inputsData.hour}
              onChange={changeData}
            />
          </label>
        </div>
        <div className="flex items-center justify-center mb-3">
          <div className="inline-flex" role="group">
            <button
              value={inputsData.courtType}
              type="button"
              onClick={
                currentCourtType
                  ? () => {
                      toggleCourtType(currentCourtType);
                    }
                  : () => {
                      toggleCourtType(!currentCourtType);
                    }
              }
              className={
                "rounded-l-3xl my-3 inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase hover:bg-blue-700 focus:bg-customblue focus:outline-none focus:ring-0 transition duration-150 ease-in-out" +
                (currentCourtType ? toggleButtonsClass : " bg-customblue/20")
              }
            >
              Indoor
            </button>
            <button
              type="button"
              onClick={
                !currentCourtType
                  ? () => {
                      toggleCourtType(currentCourtType);
                    }
                  : () => {
                      toggleCourtType(!currentCourtType);
                    }
              }
              className={
                "rounded-r-3xl my-3 inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase hover:bg-blue-700 focus:bg-customblue focus:outline-none focus:ring-0 transition duration-150 ease-in-out" +
                (currentCourtType ? " bg-customblue/40" : toggleButtonsClass)
              }
            >
              Outdoor
            </button>
          </div>
        </div>
        <label
          htmlFor="player1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Jugador 1 (opcional)
        </label>
        <select
          disabled
          onChange={changeData}
          id="player1"
          className="bg-customblue/20 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
        >
          <option defaultValue={owner}>{usernames[0]} (Creador)</option>
        </select>
        <label
          htmlFor="player2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Jugador 2 (opcional)
        </label>
        <select
          onChange={changeData}
          id="player2"
          className="bg-customblue/20 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
        >
          <option defaultValue={players[1]}>{usernames[1] ?? ""}</option>
          {usernames[1] ? <option value=""></option> : null}
          <option value="62a891c215c02ce1c436398f">Elon Musk</option>
          <option value="62a88c1d15c02ce1c436398a">Dan Abramov</option>
          <option value="62a8932915c02ce1c4363995">Sheldon Cooper</option>
          <option value="62a894c315c02ce1c436399a">Paula Badosa</option>
          <option value="62a896e915c02ce1c43639a6">Cdolz</option>
        </select>
        <label
          htmlFor="player3"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Jugador 3 (opcional)
        </label>
        <select
          onChange={changeData}
          id="player3"
          className="bg-customblue/20 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
        >
          <option defaultValue={players[2]}>{usernames[2] ?? ""}</option>
          {usernames[2] ? <option value=""></option> : null}
          <option value="62a891c215c02ce1c436398f">Elon Musk</option>
          <option value="62a88c1d15c02ce1c436398a">Dan Abramov</option>
          <option value="62a8932915c02ce1c4363995">Sheldon Cooper</option>
          <option value="62a894c315c02ce1c436399a">Paula Badosa</option>
          <option value="62a896e915c02ce1c43639a6">Cdolz</option>
        </select>
        <label
          htmlFor="player4"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Jugador 4 (opcional)
        </label>
        <select
          onChange={changeData}
          id="player4"
          className="bg-customblue/20 border border-gray-300 text-black text-sm rounded-lg focus:ring-customblue focus:border-customblue block w-full p-2.5"
        >
          <option defaultValue={players[3]}>{usernames[3] ?? ""}</option>
          {usernames[3] ? <option value=""></option> : null}
          <option value="62a891c215c02ce1c436398f">Elon Musk</option>
          <option value="62a88c1d15c02ce1c436398a">Dan Abramov</option>
          <option value="62a8932915c02ce1c4363995">Sheldon Cooper</option>
          <option value="62a894c315c02ce1c436399a">Paula Badosa</option>
          <option value="62a896e915c02ce1c43639a6">Cdolz</option>
        </select>

        <div className="flex my-5">
          <p className="mx-4">Partida {displayedBookingStatus()}</p>
          <button
            type="button"
            title="Abrir o Cerrar partida"
            className={
              "md:w-14 md:h-7 w-12 h-6 flex items-center bg-customblue rounded-full p-1 cursor-pointer " +
              (checkIfBookingIsFull()
                ? "pointer-events-none  bg-gray-300"
                : "") +
              (!openBooking ? " bg-gray-300" : "")
            }
            onClick={() => {
              toggleOpenBooking(checkIfBookingIsFull() ? false : !openBooking);
            }}
          >
            <div
              className={
                "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full transform duration-300 ease-in-out " +
                (openBooking ? openToggleClass : "")
              }
            ></div>
          </button>
        </div>
        <button
          className=" my-4 rounded-3xl inline-block px-7 py-3 bg-customblue text-white font-medium text-sm leading-snug uppercase hover:bg-customblue focus:bg-customblue focus:outline-none focus:ring-0 transition duration-150 disabled:bg-customblue/60 ease-in-out"
          type="submit"
          onClick={createBookingSubmit}
          disabled={submitButtonDisabled}
        >
          {editMode ? "Editar reserva" : "Crear Reserva"}
        </button>
        <p
          className={
            "w-56  text-red-600 text-sm mb-6 " +
            (!submitButtonDisabled ? "hidden" : "")
          }
        >
          Completa todos los datos no opcionales para poder enviar el formulario
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
