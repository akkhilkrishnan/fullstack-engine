import './App.scss';
import DesignWorkoutPage from './Pages/DesignWorkoutPage'
import ViewMembersInfo from './Pages/ViewMembersInfo'
import GetMemberInfo from './Pages/getMemberInfo';
import Header from "./Components/Header";
import Home from "./Pages/Home";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './Components/Login/LoginPage';
function App() {
    return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="designworkout" element={<DesignWorkoutPage />}></Route>
          <Route path="addnewmember" element={<GetMemberInfo />}></Route>
          <Route path="viewmemberdetails" element={<ViewMembersInfo />}></Route>
        </Routes> 
        {/* <LoginPage/> */}
    </div>
  );
}

export default App;