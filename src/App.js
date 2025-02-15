import "./App.css";
import "../src/styles/Calendar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/navbar.jsx";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateTask from "./pages/CreateTask";  
import Taskhistory from "./pages/TaskHistory";
import HelperTaskhistory from "./pages/TaskHistory/helper.jsx";
import SearchTask from "./pages/SearchTask";
import Resume from "./pages/Signup/resume.jsx";
import Reset from "./pages/Reset";

function App() {

  return (
    <>
      <Router>
        <Navbar />
          {/* <Select options={options} onChange={handleChange} /> */}
        <Routes> 
        {/* <Button buttonText="Opposite" buttonType="opposite" to="login" />
        <Button buttonText="Default" to="login" /> */}
        {/* <Searchbar /> */}

        {/* <AsyncSelect options={options} onChange={handleChange} /> */}

    
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/createtask/:serviceType" element={<CreateTask />} />
          <Route path="/taskhistory" element={<Taskhistory />} />
          <Route path="/helpertaskhistory" element={<HelperTaskhistory />} />
          <Route path="/searchtask" element={<SearchTask />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
