/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";

function Transactions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <div className="transactions" css={CSS}>
      <h1>Transactions History</h1>
      <div className="table">
        <table>
          <thead>
            <tr key={"id-1"}>
              <td>senderId</td>
              <td>ReceiverId</td>
              <td>Amount</td>
              
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <td>100000</td>
                <td>100001</td>
                <td>200000</td>
               
              </tr>
              <tr >
                <td>100002</td>
                <td>100004</td>
                <td>300000</td>
               
              </tr>
              <tr >
                <td>100003</td>
                <td>100005</td>
                <td>300000</td>
               
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgb(72, 202, 228);
  background: linear-gradient(
    180deg,
    rgba(72, 202, 228, 1) 0%,
    rgba(173, 232, 244, 1) 50%,
    rgba(202, 240, 248, 1) 100%
  );
  font-family: "Roboto", sans-serif;

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

  .table {
    display: table;
    overflow: scroll;
    height: 100vh;

    table {
      table-layout: fixed;
      color: var(--powder-blue);
      margin: 2rem 0;
      border-collapse: collapse;
      border: 1px solid black;

      thead {
        background-color: var(--navy-blue);

        tr {
          td {
            padding: 10px;
            text-align: center;
            font-weight: 700;
          }
        }
      }

      tbody {
        background-color: var(--cerulean-crayola);

        tr {

          td {
            padding: 10px;
            border-right: 1px solid var(--navy-blue);
            text-align: right;
          }
        }

        .light {
          background-color: var(--sky-blue-crayola);
        }
      }
    }
  }
`;

export default Transactions;
