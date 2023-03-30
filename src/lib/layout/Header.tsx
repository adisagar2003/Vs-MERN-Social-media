import { Box, Button, Flex, IconButton, MenuIcon, Text } from "@chakra-ui/react";
import { UserContext } from "lib/context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {BsChat} from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";

import {useCookies} from "react-cookie";

const Header = () => {
  const [cookies,setCookie, removeCookie] = useCookies(['accessToken']);
  
   function Logout()
{
  sessionStorage.removeItem("userData");
  removeCookie('accessToken');

  location.href="/";

}  const navigate = useNavigate();
  
  const userData:any =  useContext(UserContext);

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
    <Text fontSize={'2xl'} paddingTop={'10px'} fontWeight={'bold'} onClick={()=>navigate("/")}>VMedia</Text>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
      {userData._id?  <Button>
        <BsChat />
      </Button>:null }

      {userData._id? <Button colorScheme='red' onClick={Logout}>Logout</Button>: null}
    </Flex>
  );
};

export default Header;
