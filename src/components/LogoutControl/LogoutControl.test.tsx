import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LogoutControl from "./LogoutControl";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

let mockLogged = true;

describe("Given a LoginControl component", () => {
  describe("When it's invoked and logged status is true", () => {
    test("Then it should call navigate with bookings page path", () => {
      const loginPagePath = "/bookings";
      const mockUserSlice = createSlice({
        name: "user",
        initialState: { logged: mockLogged },
        reducers: {},
      });

      const mockStore = configureStore({
        reducer: { user: mockUserSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <LogoutControl>
            <p>Chilren</p>
          </LogoutControl>
        </Provider>
      );

      expect(mockUseNavigate).toHaveBeenCalledWith(loginPagePath);
    });
  });

  describe("When it's invoked and logged status is false", () => {
    test("Then it should render a level 1 heading with text 'Children'", () => {
      mockLogged = false;
      const mockUserSlice = createSlice({
        name: "user",
        initialState: { logged: mockLogged },
        reducers: {},
      });

      const mockStore = configureStore({
        reducer: { user: mockUserSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <LogoutControl>
            <h1>Children</h1>
          </LogoutControl>
        </Provider>
      );

      const childrenText = screen.getByRole("heading", { name: "Children" });

      expect(childrenText).toBeInTheDocument();
    });
  });
});
