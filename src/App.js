
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';
import AccountCreation from './components/AccountCreation';
import UserDetails from './components/UserDetails';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
    <Router>
        <Alert alert={alert}/>
        <div className="container">
            <Routes>
            <Route exact path="/" element={<AccountCreation showAlert={showAlert}/>}/>
            <Route exact path="/UserDetails" element={<UserDetails showAlert={showAlert}/>}/>
            </Routes>
            </div>
    </Router>
    </>
  );
}

export default App;
