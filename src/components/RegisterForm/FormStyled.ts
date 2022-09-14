import styled from "styled-components";

const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 1.5rem;

  .register-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    width: 12rem;
    margin-bottom: 10px;
    text-align: left;
  }
  .inputs-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input {
    background-color: #fff;
    width: 12rem;
    height: 2rem;
    padding-left: 8px;
    margin-top: 4px;
    border: 0.05rem #c4c4c4 solid;
    border-radius: 0.25rem;

    &::placeholder {
      font-size: 11px;
      color: gray;
    }
  }
  .submit-button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 10rem;
    height: 3rem;
    background-color: #1974b6;
    border: none;
    border-radius: 1.5rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
  }
  .picture-selector {
    padding-left: 0;
  }
  p {
    text-align: center;
  }
`;

export default FormStyled;
