/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

function Login (){
  const [values,setValues] = useState({
    name:'',
    password:''
  })
  
  const navigate = useNavigate();
  const HandleInput = (event) => {
    setValues(prev =>({...prev,[event.target.name]:[event.target.value]}))
  } 
  const submitHandler = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8081/Login',values)
    .then(res => {
      if (res.data === 'success'){
        navigate('/Home');
      }else{
        alert('no record existed');
      }
    })
    .catch(err => console.log(err));
  }
  return(
    <div className="create__user" css={CSS}>
      <h1>Login</h1>
      <form  action="" onSubmit={submitHandler} className="form">
        <div className="form__item">
          <label className="label" htmlFor="name">
            Enter Full Name:
          </label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Full Name"
            onChange={HandleInput}
          />
        </div>
        <div className="form__item">
          <label htmlFor="account-no" className="label">
            password:
          </label>
          <input
            type="number"
            name="password"
            className="input"
            placeholder="6-digit Account Number"
            onChange={HandleInput 
            }
          />
        </div>
        <div className="form__item">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
    
}

const CSS = css`
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

export default Login;

