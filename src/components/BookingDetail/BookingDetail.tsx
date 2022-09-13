import BookingDetailStyled from "./BookingDetailStyled";
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
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  addUserToBookingPlayersThunk,
  deleteBookingThunk,
  getBookingAndPlayersUsernamesThunk,
} from "../../redux/thunks/bookingsThunks/bookingsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const BookingDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const defaultProfilePicture = "../../images/blank-profile-picture.webp";

  const { booking, playersUsernames } = useAppSelector(
    (state) => state.booking
  );

  const { id: userId } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBookingAndPlayersUsernamesThunk(id as string));
  }, [dispatch, id]);

  const deleteBooking = () => {
    dispatch(deleteBookingThunk(id as string));
    setTimeout(() => navigate(-1), 1000);
  };

  const addUserToPlayers = () => {
    dispatch(
      addUserToBookingPlayersThunk(id as string, [
        ...booking.players,
        userId as string,
      ])
    );
    dispatch(getBookingAndPlayersUsernamesThunk(id as string));
  };

  const goToEditPage = (): void => navigate(`/bookings/editBooking/${id}`);

  const userBooking = booking.owner === userId;

  return (
    <BookingDetailStyled>
      <div className="non-detail-container">
        <div className="booking-info-container">
          <div className="club-container">
            <h3>{booking.club}</h3>
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24  rounded-full bg-white"
                src={`../../images/${booking.club.replace(" ", "")}.webp`}
                alt="Logo Club"
              />
            </div>
          </div>
          <div className="data-container">
            <div className="data-container_item">
              <span>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <p>{booking.date}</p>
            </div>
            <div className="data-container_item">
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              <p>{booking.hour}</p>
            </div>
            <div className="data-container_item">
              <span>
                <FontAwesomeIcon icon={faHome} />
              </span>
              <p>{booking.courtType}</p>
            </div>
            <div className="data-container_item">
              <span>
                <FontAwesomeIcon icon={faLock} />
              </span>
              <p>{`${booking.open ? "Reserva abierta" : "Reserva cerrada"}`}</p>
            </div>
          </div>
        </div>

        <div className="booking-buttons-container">
          <button
            title="Editar reserva"
            onClick={goToEditPage}
            hidden={!userBooking}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            title="Unirse a esta reserva"
            onClick={addUserToPlayers}
            hidden={userBooking || !booking.open}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button
            title="Eliminar reserva"
            onClick={deleteBooking}
            hidden={!userBooking}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <span className="separation-line border-t-2 border-customblue/20 pb-5 mt-5  w-4/6"></span>
      <div className="detail-container">
        <p className="text-center mb-2">Jugadores</p>

        <div className="player-info">
          <h4 className="player-info_player-name bg-customblue/20  border border-gray-300 -sm rounded-lg ">
            {playersUsernames[0] ?? "Sin asignar"}
          </h4>
          <img
            src={defaultProfilePicture}
            alt=""
            className="player-info_player-picture"
          />
        </div>
        <div className="player-info">
          <h4 className="player-info_player-name bg-customblue/20  border border-gray-300 -sm rounded-lg ">
            {playersUsernames[1] ?? "Sin asignar"}
          </h4>
          <img
            src={defaultProfilePicture}
            alt=""
            className="player-info_player-picture"
          />
        </div>
        <div className="player-info">
          <h4 className="player-info_player-name bg-customblue/20  border border-gray-300 -sm rounded-lg ">
            {playersUsernames[2] ?? "Sin asignar"}
          </h4>
          <img
            src={defaultProfilePicture}
            alt=""
            className="player-info_player-picture"
          />
        </div>
        <div className="player-info">
          <h4 className="player-info_player-name bg-customblue/20  border border-gray-300 -sm rounded-lg ">
            {playersUsernames[3] ?? "Sin asignar"}
          </h4>
          <img
            src={defaultProfilePicture}
            alt=""
            className="player-info_player-picture"
          />
        </div>
        <p className="text-center mt-3"> Dueño de la reserva:</p>
        <p className="text-center font-bold capitalize">
          {playersUsernames[0]}
        </p>
      </div>
    </BookingDetailStyled>
  );
};

export default BookingDetail;
