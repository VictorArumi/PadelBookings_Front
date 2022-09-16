import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../redux/store";

import Booking from "./Booking";
import { BrowserRouter } from "react-router-dom";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Given a Booking component", () => {
  describe("When the user clicks on the join button", () => {
    test("Then dispatch should be called", () => {});

    const joinBookingButtonTitle = "Unirse a esta reserva";
    const leaveBookingButtonTitle = "Salir de esta reserva";

    const mockBooking = {
      club: "RCTB",
      owner: "6299261c885d2211475ec5ec",
      date: "25/10/2022",
      hour: "17",
      courtType: "Outdoor",
      players: ["6299261c885d2211475ec5ec"],
      open: false,
      id: "629a19fe5a16e50d33d55cb3",
    };

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Booking booking={mockBooking} />
        </Provider>
      </BrowserRouter>
    );

    const joinButton = screen.getByTitle(joinBookingButtonTitle);

    userEvent.click(joinButton);

    const leaveButton = screen.getByTitle(leaveBookingButtonTitle);

    userEvent.click(leaveButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
