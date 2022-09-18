import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import BookingDetail from "./BookingDetail";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Given a BookingsPage component", () => {
  describe("When it's invoked and the user clicks on delete button", () => {
    test("Then dispatch should be called", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <BookingDetail />
          </Provider>
        </BrowserRouter>
      );
      const deleteBookingButton = screen.getByTitle("Eliminar reserva");

      userEvent.click(deleteBookingButton);

      expect(mockDispatch).toBeCalledTimes(2);
    });
  });
  describe("When it's invoked and the user clicks on join button", () => {
    test("Then dispatch should be called", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <BookingDetail />
          </Provider>
        </BrowserRouter>
      );
      const joinBookingButton = screen.getByTitle("Unirse a esta reserva");

      userEvent.click(joinBookingButton);

      expect(mockDispatch).toBeCalledTimes(3);
    });
  });
});
