import BookingStyled from "./BookingStyled";
import {
  faCalendar,
  faClock,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLock,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IBooking } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  addUserToBookingPlayersThunk,
  deleteBookingThunk,
  getBookingAndPlayersUsernamesThunk,
} from "../../redux/thunks/bookingsThunks/bookingsThunks";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface Props {
  booking: IBooking;
}

const Booking = ({
  booking: { club, date, hour, courtType, open, id, owner, players },
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const deleteBooking = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    dispatch(deleteBookingThunk(id));
  };
  const { id: userId } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const goToEditPage = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    navigate(`/bookings/editBooking/${id}`);
  };
  const goToDetailPage = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    navigate(`/bookings/detail/${id}`);
  };

  const [alreadyAddedUser, setAlreadyAddedUser] = useState(false);
  const addUserToPlayers = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    dispatch(
      addUserToBookingPlayersThunk(id as string, [...players, userId as string])
    );
    dispatch(getBookingAndPlayersUsernamesThunk(id as string));
    setAlreadyAddedUser(true);
  };

  const userBooking = owner === userId;

  return (
    <BookingStyled onClick={goToDetailPage}>
      <div className="booking-info-container">
        <div className="club-container">
          <h3>{club}</h3>
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12  rounded-full bg-white"
              src={`../../images/${club.replace(" ", "")}.webp`}
              alt="Logo Club"
            />
          </div>
        </div>
        <div className="data-container">
          <div className="data-container_item">
            <span>
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <p>{date}</p>
          </div>
          <div className="data-container_item">
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <p>{hour}</p>
          </div>
          <div className="data-container_item">
            <span>
              <FontAwesomeIcon icon={faHome} />
            </span>
            <p>{courtType}</p>
          </div>
          <div className="data-container_item">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <p>Reserva{`${open ? " abierta" : " cerrada"}`}</p>
          </div>
        </div>
      </div>

      <div
        className={
          "booking-buttons-container" +
          (!userBooking ? " booking-buttons-container--not-owner" : "")
        }
      >
        <button
          title="Editar reserva"
          hidden={!userBooking}
          onClick={goToEditPage}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          onClick={addUserToPlayers}
          title="Unirse a esta reserva"
          className="add-button"
          hidden={userBooking || !open || alreadyAddedUser}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        <button
          title="Eliminar reserva"
          hidden={!userBooking}
          onClick={deleteBooking}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </BookingStyled>
  );
};

export default Booking;
