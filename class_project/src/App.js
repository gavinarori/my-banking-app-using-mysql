import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Transfer from "./components/Transfer";
import Transactions from "./components/Transactions";
import AllOurCustomers from "./components/AllOurCustomers";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/transfer" element={<Transfer/>} />
          <Route path="/transfer" element={<AllOurCustomers />} />
          <Route path="/transactions-history" element={<Transactions/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
