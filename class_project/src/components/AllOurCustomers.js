/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

function AllOurCustomers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="allOurCustomers" css={CSS}>
      <h1>All Our Customers</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>UID</td>
              <td>Name</td>
              <td>Account Number</td>
              <td>Current Balance</td>
              <td>
                <ion-icon name="cash-outline"></ion-icon>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="light">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.account_number}</td>
                <td>{user.balance}</td>
                <td>
                  <Link to="/transfer">Transfer Money</Link>
                </td>
              </tr>
            ))}
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

            ion-icon {
              font-size: 20px;
            }
          }
        }
      }

      tbody {
        background-color: var(--cerulean-crayola);

        tr {
          a{
            color: #BF0000;
            transition: all 0.3s ease;
          }

          a:hover {
            text-decoration: underline;
          }

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

export default AllOurCustomers;

// {Array.from(Object.values(database)).map(arr => arr.map(e => (<p>{e}</p>)))}
