import Login from "./components/Login"
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Mycontext from "./components/Context";
import Info from "./components/Info";
import Cropselldetails from "./components/Cropselldetails";
import Dta_Cropgetall from "./components/Dta_Cropgetall";
import GetCrop from "./components/GetCrop";
import Alldata from "./components/Alldata";
 
function App() {
 const [fullName,SetFullname]=useState("");
    const [address,Setaddress]=useState("");
    const [phoneNumber,SetPhonenumber]=useState("");
    const [email,Setemail]=useState("");
    const [age,Setage]=useState("");
    const [password,setPassword]=useState("");

  return (
    <>
    <Mycontext.Provider value={{fullName,SetFullname,phoneNumber,SetPhonenumber,address,Setaddress,email,Setemail,password, setPassword,Setage,age}}> 
      <BrowserRouter>
<Header />
        <div>

          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userinfo" element={<Info />} />
            <Route path="/addcrops" element={<Cropselldetails />} />
            <Route path="/sellingcrops" element={<Dta_Cropgetall />} />
            <Route path="/getcropdetails" element={<GetCrop />} />
            <Route path="/getalldata" element={<Alldata />} />
            
          
            


          </Routes>
        </div>
      </BrowserRouter>
      </Mycontext.Provider>
    </>
  )
}

export default App
