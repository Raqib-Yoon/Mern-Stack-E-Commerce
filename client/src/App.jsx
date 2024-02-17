import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/users/forms/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>as;dlfkjasd;fl</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
