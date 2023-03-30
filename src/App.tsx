import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { theme } from "lib/styles/theme";
import {useEffect} from "react";
import { UserContext } from "lib/context/UserContext";
import { CookiesProvider } from "react-cookie";

const App = () => {


const [userData,setUserData] = useState({logged:false});


useEffect(() => {
  var d:any = sessionStorage.getItem("userData");
  if (d!=null){
    d= JSON.parse(d);
  }else{
    d={logged:false}
  }

  setUserData(sessionStorage.getItem("userData")? d:{logged:false})
}, [])



  
  return (
  <ChakraProvider theme={theme}>
  <CookiesProvider>
   <UserContext.Provider value={userData}>
    <Router>
      <Layout>
        <Routings />
      </Layout>
    </Router>
    </UserContext.Provider>
    </CookiesProvider>
  </ChakraProvider>
)};

export default App;
