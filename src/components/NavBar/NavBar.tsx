import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import NavBarStyled from "./NavBarStyled";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOutActionCreator } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { logged, profilePicture, profilePictureBackup, username } =
    useAppSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const closeNavBar = () => setIsOpen(false);

  const logOut = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(logOutActionCreator());
    setIsOpen(!isOpen);
    navigate("/login");
    toast.success("Sesión cerrada, vuelve pronto!");
  };

  const url = process.env.REACT_APP_API_URL;

  const pictureUrlOnError = (error: any) => {
    (error.target as HTMLImageElement).src = profilePictureBackup;
  };

  return (
    <NavBarStyled>
      <nav className="bg-customblue min-w-350">
        <div className="min-w-350 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="-mr-2 flex md:hidden">
              <button
                id="menu"
                title="Menú"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only"></span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className={"h-9 w-9 " + (logged ? "logo " : "")}
                  src="https://tailwindui.com/img/logos/workflow-mark-white.svg"
                  alt="Workflow"
                />
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {logged && (
                    <>
                      {" "}
                      <p className="hidden text-xl text-yellow-100 first-letter:font-bold lg:block">
                        Padel
                      </p>
                      <p className="hidden text-xl text-yellow-100 mx-0 p-0 first-letter:font-bold lg:block">
                        Bookings®
                      </p>
                      <span>
                        <Link
                          to={"/bookings"}
                          className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Reservas
                        </Link>
                      </span>
                      <span>
                        <Link
                          to={"/bookings/create"}
                          className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Nueva reserva
                        </Link>
                      </span>
                      <span>
                        <Link
                          to={`/bookings/mybookings/${username}`}
                          className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Mis reservas
                        </Link>
                      </span>
                    </>
                  )}
                  {logged ? (
                    <p
                      onClick={logOut}
                      className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Cerrar sesión
                    </p>
                  ) : (
                    <>
                      <p className="invisible text-xl text-yellow-100 first-letter:font-bold md:visible">
                        Padel
                      </p>
                      <p className="invisible text-xl text-yellow-100 mx-0 p-0 first-letter:font-bold md:visible">
                        Bookings®
                      </p>
                      <span>
                        <Link
                          to={"/login"}
                          className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Iniciar sesión
                        </Link>
                      </span>
                      <span>
                        <Link
                          to={"/register"}
                          className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Crear cuenta
                        </Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {logged ? (
              <div className="flex items-center">
                <p className="text-white mr-2">{username}</p>

                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 border border-customblue rounded-full bg-white"
                    src={`${url}uploads/images/${profilePicture}`}
                    alt="Foto de perfil"
                    onError={pictureUrlOnError}
                  />
                </div>
              </div>
            ) : (
              <span className="h-8 w-8"></span>
            )}
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {logged && (
                  <>
                    <span onClick={closeNavBar}>
                      <Link
                        to={"/bookings"}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Reservas
                      </Link>
                    </span>
                    <span onClick={closeNavBar}>
                      <Link
                        to={"/bookings/create"}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Nueva reserva
                      </Link>
                    </span>
                    <span onClick={closeNavBar}>
                      <Link
                        to={`/bookings/mybookings/${username}`}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Mis reservas
                      </Link>
                    </span>
                  </>
                )}
                {logged ? (
                  <p
                    onClick={logOut}
                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Cerrar sesión
                  </p>
                ) : (
                  <>
                    <span onClick={closeNavBar}>
                      <Link
                        to={"/login"}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Iniciar sesión
                      </Link>
                    </span>
                    <span onClick={closeNavBar}>
                      <Link
                        to={"/register"}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Crear cuenta
                      </Link>
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </NavBarStyled>
  );
}

export default NavBar;
