/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


function Transfer() {
  const [values, setValues] = useState({
    to: "",
    from: "",
    amount: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/transfer", values)
      .then((res) => {
        console.log(res.data);
        navigate('/transactions-history');
        // Handle success, e.g., show a success message or navigate to another page
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      });
  };

  return (
    <div className="transfer" css={CSS}>
      <h1>Transfer:</h1>
      <form className="form" onSubmit={submitHandler}>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Transfer from:
          </label>
          <input
            type="number"
            min={100000}
            max={999999}
            name="from"
            className="input"
            placeholder="senderId"
            onChange={handleInput}
          />
        </div>
        <div className="form__item">
          <label htmlFor="to" className="label">
            Transfer to:
          </label>
          <input
            type="number"
            min={100000}
            max={999999}
            name="to"
            className="input"
            placeholder="receiverId"
            onChange={handleInput}
          />
        </div>
        <div className="form__item">
          <label htmlFor="amount" className="label">
            Enter Amount:
          </label>
          <input
            type="number"
            min={1}
            name="amount"
            className="input"
            placeholder="Amount"
            value={values.amount}
            onChange={handleInput}
          />
        </div>
        <div className="form__item">
          <button type="submit" className="submit">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}



const CSS = css`
  width: 100%;
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(72, 202, 228);
  background: linear-gradient(
    180deg,
    rgba(72, 202, 228, 1) 0%,
    rgba(173, 232, 244, 1) 50%,
    rgba(202, 240, 248, 1) 100%
  );

  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 3rem;
    color: var(--star-command-blue);
    text-decoration: underline;
  }

  @media screen and (max-width: 400px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--dark-cornflower-blue);
    padding: 50px;
    margin: 0 auto;
    border-radius: 4px;
    color: white;
    font-family: "Roboto", sans-serif;
    width: 80%;
    max-width: 650px;

    .form__item {
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 10px 0;

      .label {
        font-size: 20px;
      }

      .input {
        font-size: 18px;
        margin-top: 10px;
        padding: 5px;
        border-radius: 4px;
      }

      .submit {
        padding: 10px;
        text-transform: uppercase;
        border-radius: 4px;
        font-weight: 600;
        background: var(--navy-blue);
        color: var(--powder-blue);
        transition: all 0.3s ease;
      }

      .submit:hover {
        background-color: var(--sky-blue-crayola);
        color: var(--navy-blue);
      }

      .submit:target {
        background-color: var(--blizzard-blue;);
      }
    }
  }

  @media screen and (max-width: 780px) {
    .form {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export default Transfer;
