import styled from "styled-components";

const BookingsPageStyled = styled.div`
  height: 100%;

  .filters-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;

    &__section {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 8px;
    }

    &__button {
      width: 150px;
      height: 40px;
      background-color: rgb(25, 116, 182, 0.2);
      margin: 5px 0px;
      border: 1px solid rgb(25, 116, 182);
      border-radius: 1.5rem;

      &--active {
        background-color: rgb(25, 116, 182);
        color: white;
      }
    }

    @media (min-width: 710px) {
      margin-bottom: 50px;
      .filters-container__section {
        flex-direction: row;
        width: 100%;
      }
    }
  }
`;

export default BookingsPageStyled;
