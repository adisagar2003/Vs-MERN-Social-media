import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "lib/api/Api";
import { useCookies } from "react-cookie";
import { currentUserData, currentUserId } from "../../utils/currentUser";

type PropsCard = {
  postHeading: string;
  imageSource: string;
  ownerName: string;
  description: string;
  id: any;
  likes: Array<any>;
};
export default function PostCard(props: PropsCard) {
  console.log(currentUserData);

  console.log({ props });
  const [cookies] = useCookies();
  console.log(cookies.accessToken);
  const [liked, setLiked] = useState(
    props.likes.indexOf(`${currentUserData._id}`) != -1
  );
  const navigate = useNavigate();
  const toast = useToast();
  function likePost() {
    axios
      .post(
        `${API_URL}post/like`,
        {
          postId: props.id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast({
          title: "💘",
          description: `Post liked`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLiked(true);
      })
      .catch((err) => {
        toast({
          title: " Login to like",
          description: `${err.message}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  function unlikePost() {
    axios
      .post(
        `${API_URL}post/unlike`,
        {
          postId: props.id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast({
          title: "💔",
          description: `Post unliked 💔`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLiked(false);
      })
      .catch((err) => {
        toast({
          title: " Error",
          description: `${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={`data:image/jpeg;base64,${props.imageSource}`}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {props.ownerName}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {props.postHeading}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {props.description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            onClick={() => navigate(`/post/${props.id}`)}
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={!liked ? likePost : unlikePost}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
