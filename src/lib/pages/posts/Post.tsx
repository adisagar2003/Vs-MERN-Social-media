import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "lib/api/Api";
import PostCard from "lib/components/PostCard";
import React, { useEffect, useState } from "react";
import { currentUserData, currentUserId } from "../../../utils/currentUser";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import "../../components/UserCard";
import UserCard from "../../components/UserCard";
import { useFetch } from "../../../useFetch";
import { useCookies } from "react-cookie";
import { BsPersonExclamation } from "react-icons/bs";

type Props = {};

function Post({}: Props) {
  const toast = useToast();
  const [postsData, setPostsData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { usersData, loadingUsers, error } = useFetch(`${API_URL}user`);
  const [userDataRerender, setUserDataRerender] = useState(false);
  const [cookies] = useCookies();
  function Like() {}

  function ButtonNavigationToUpload() {
    if (usersData.length > 0) {
      navigate("/upload");
    } else {
      toast({
        title: `Login to Post`,
        status: "warning",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    console.log("Changing User Data");
  }, [usersData]);
  // Fetching API from Posts
  const navigate = useNavigate();
  // Get Data for Posts

  useEffect(() => {
    console.log("Hello there");
  }, [userDataRerender]);

  useEffect(() => {
    axios
      .get(`${API_URL}post?limit=10`)
      .then((response) => {})
      .catch((err) => {
        setPostsData(err.response.data.data);
        setLoading(false);
      });
  }, []);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    if (currentUserId) {
    } else {
      onEditOpen();
    }
  }, []);
  return (
    <div>
      <Button
        onClick={ButtonNavigationToUpload}
        size="md"
        position={"fixed"}
        bottom={5}
        right={10}
        height="48px"
        width="200px"
        border="2px"
        backgroundColor={"green.500"}
        borderColor="green.500"
      >
        Upload
      </Button>
      <SimpleGrid minChildWidth="320px" spacing="40px">
        {/* Modal for sample user providing */}

        {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hello Stranger!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Here is the sample user data for you to test!</Text>

              <Text fontWeight={700}>Email: user@gmail.com</Text>
              <Text fontWeight={700}>password: password</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onEditClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}

        {postsData.length == 0 && (
          <div style={{ position: "fixed", top: "50%", left: "50%" }}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )}
        {postsData.length == 0 && (
          <Text position={"fixed"} bottom={10}>
            Loading might take time...
          </Text>
        )}
        {postsData.map((data: any) => {
          // return (<div>{JSON.stringify(data)}</div>)
          return (
            <PostCard
              id={data._id}
              ownerName={data.ownerName}
              imageSource={data.imageSource}
              postHeading={data.postHeading}
              description={data.description}
              likes={data.likes}
            />
          );
        })}
      </SimpleGrid>

      {/* Icon Showing Who to Follow Users */}

      {usersData.length > 0 && (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Follow Users for more.
          </Heading>
          <Text color={"gray.500"}>
            The App Features Following and Unfollowing people with messaging,
            please login to see more
          </Text>
        </Box>
      )}

      {usersData.length == 0 && postsData.length > 0 && (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.400"} />
          <Heading>Login to follow creators 💘</Heading>
        </Box>
      )}
      <SimpleGrid minChildWidth="320px" spacing="40px">
        {usersData.length > 0 &&
          postsData.length > 0 &&
          usersData.map((data: any) => {
            return (
              <UserCard
                followerCount={data.followers.length}
                triggerChange={userDataRerender}
                setTriggerChange={setUserDataRerender}
                follows={data.followers.indexOf(currentUserData._id) != -1}
                id={data._id}
                followingCount={data.following.length}
                userName={data.firstName}
                avatarUrl={data.avatar}
              />
            );

            // followerCount: number,
            // followingCount: number,
            // userName: string,
            // avatarUrl: string
          })}
      </SimpleGrid>
    </div>
  );
}

export default Post;
