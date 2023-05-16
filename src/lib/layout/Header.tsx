import {
  Box,
  Button,
  Flex,
  IconButton,
  MenuIcon,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "lib/context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";

import { useCookies } from "react-cookie";

import { ReactNode } from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  MenuList,
  MenuDivider,
  MenuItem,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  function Logout() {
    sessionStorage.removeItem("userData");
    removeCookie("accessToken");

    location.href = "/";
  }
  const navigate = useNavigate();

  const userData: any = useContext(UserContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(userData);
  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        position={"fixed"}
        top={0}
        width={"100vw"}
        height={["65px", "65px"]}
        zIndex={99999999}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            {" "}
            <Box>VS.Media</Box>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} marginRight={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {!userData.firstName && (
                <Link to="/login">
                  <Text marginTop={2}>Login</Text>
                </Link>
              )}
              {!userData.firstName && (
                <Link to="/register">
                  <Text marginTop={2}>Register</Text>
                </Link>
              )}
              {userData.firstName && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={userData.avatar} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={userData.avatar} />
                    </Center>
                    <br />
                    <Center>
                      <p>{userData.firstName}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Posts</MenuItem>
                    <Link to="/messages">
                      <MenuItem>Messages</MenuItem>
                    </Link>
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
