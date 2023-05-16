import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "lib/api/Api";
import { useCookies } from "react-cookie";

type Props = {
  followerCount: number;
  followingCount: number;
  userName: string;
  avatarUrl: string;
  id: string;
  follows: boolean;
  triggerChange: boolean;
  setTriggerChange: Function;
};

export default function UserCard(props: Props) {
  const [followerCountReactive, setFollowerCount] = useState(
    props.followerCount
  );
  const [followingCountReactive, setFollowingCountReactive] = useState(
    props.followingCount
  );
  const [followsReactive, setFollowsReactive] = useState(props.follows);
  useEffect(() => {
    console.log("rerender");
  }, [props]);
  const [cookies] = useCookies();
  const toast = useToast();
  function Follow() {
    axios
      .post(
        `${API_URL}user/follow`,
        {
          targetUser: `${props.id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast({
          title: "Account Followed 😃✅",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFollowerCount(followerCountReactive + 1);
        setFollowsReactive(true);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function Unfollow() {
    axios
      .post(
        `${API_URL}user/unfollow`,
        {
          targetUser: `${props.id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((response) => {
        props.setTriggerChange(!props.triggerChange);
        toast({
          title: "Account Unfollowed 💔",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFollowsReactive(false);
        setFollowerCount(followerCountReactive - 1);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            backgroundColor="white"
            src={`https://robohash.org/${Math.floor(Math.random() * 1004300)}`}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {props.userName}
            </Heading>
            <Text color={"gray.500"}>User</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{followerCountReactive}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{followingCountReactive}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Following
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={followsReactive ? Unfollow : Follow}
          >
            {followsReactive ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
