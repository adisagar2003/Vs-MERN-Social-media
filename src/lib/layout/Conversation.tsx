import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../api/Api";

import { useEffect, useRef, useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import axios from "axios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import Message from "lib/components/Message";
import { BsMessenger, BsPerson } from "react-icons/bs";
import { io } from "socket.io-client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
export const Conversation: any = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: participantsModalOpen,
    onOpen: setParticipantsModalOpen,
    onClose: setParticipantsModalClose,
  } = useDisclosure();
  const currentUserId: any = JSON.parse(
    sessionStorage.getItem("userData") || "{}"
  )._id;
  const currentUserName: any = JSON.parse(
    sessionStorage.getItem("userData") || "{}"
  ).firstName;
  const socket = io(API_URL);

  const params = useParams();
  const navigate = useNavigate();
  const [loadingConvo, setLoadingConvo] = useState(true);
  const [convoData, setConvoData] = useState<any>({});
  const { toggleColorMode } = useColorMode();
  const color = useColorModeValue("gray.200", "gray.900");
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [messageData, setMessageData] = useState<Array<object>>([]);
  const [message, setMessage] = useState<string>("");
  const [participants, setParticipants] = useState<Array<string>>([]);
  const [error, setError] = useState<any>({ error: false, message: "" });
  const [email, setEmail] = useState<string>("");
  const [messageButtonLoading, setMessageButtonLoading] =
    useState<boolean>(false);
  const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);
  const [conversationParticipants, setConversationParticipants] = useState<any>(
    { data: [] }
  );
  const [cookies, setCookie, removeCookie] = useCookies();
  const ref = useRef();
  const [addPersonLoading, setAddPersonLoading] = useState(false);

  //Realtime data getting message

  useEffect(() => {
    socket.emit("join", params.id);
  }, []);

  useEffect(() => {
    let isSocketMounted = true;

    socket.on("get_message", (data) => {
      console.log(data, "DAJOIFEHIUHHIAEHIFI");
      setMessageData([...messageData, data]);

      //   axios.get(`${API_URL}messages/${params.id}`,{
      //     headers:{
      //       authorization: `Bearer ${cookies.accessToken}`
      //      }
      //   }).then(result=>{
      //     setMessageData(result.data.data);
      //     setLoadingConvo(false);

      //   }).catch(err=>{
      //     setError({error:true, message: err.message});
      //   })
      // });
    });

    if (!socket.connected) {
      socket.emit("join", params.id);
    }
  }, [socket]);

  // send message
  function sendMessage() {
    socket.emit("send_message", {
      content: message,
      conversationId: params.id,
      senderId: { _id: currentUserId, firstName: currentUserName },
    });
    if (message != "" && socket.connected) {
      console.log("sending message quick!");
      setMessageData([
        ...messageData,
        {
          content: message,
          conversationId: params.id,
          senderId: { _id: currentUserId, firstName: currentUserName },
        },
      ]);
      setMessage("");
    } else {
      alert("empty message or connection lost, reload for handshake");
    }
  }

  //fetching participants for the conversation
  function getParticipants() {
    axios
      .get(`${API_URL}conversation/${params.id}/participants`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((result) => {
        setConversationParticipants(result.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getParticipants();
  }, []);

  //fetching the messages

  useEffect(() => {
    axios
      .get(`${API_URL}messages/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((result) => {
        setMessageData(result.data.data);
        setLoadingConvo(false);
      })
      .catch((err) => {
        setError({ error: true, message: err.message });
      });
  }, []);

  // fetching the conversation
  useEffect(() => {
    axios
      .get(`${API_URL}conversation/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((result) => {
        setConvoData(result.data.data);

        setLoadingConvo(false);
      })
      .catch((err) => setError({ error: true, message: err.message }));
  }, []);

  // function add person query
  function addPerson() {
    setAddPersonLoading(true);
    axios
      .post(
        `${API_URL}conversation/add`,
        {
          participants: participants,
          conversationId: params.id,
        },
        {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setAddPersonLoading(false);
        setParticipants([]);
        getParticipants();
        onClose();
      })
      .catch((err) => {
        console.log(err.message);
        setError("Email/s you entered does not exist");
        setAddPersonLoading(false);
        setParticipants([]);
      });
  }

  return (
    <div>
      <Modal isOpen={participantsModalOpen} onClose={setParticipantsModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Participants</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {conversationParticipants.data.map((element: any) => {
              return (
                <Text>
                  {element.firstName} - {element.email}
                </Text>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={setParticipantsModalClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {error.error ? <Alert colorScheme={"red"}>{error.message}</Alert> : null}
      <div style={{ position: "relative", height: "500px" }}>
        {loadingConvo ? (
          <div>Loading....</div>
        ) : (
          <div>
            <Box
              height={"70vh"}
              display={"flex"}
              borderRadius={"10px"}
              backgroundColor={color}
              position="relative"
            >
              <Box
                height={"70vh"}
                width={"30%"}
                padding="4px"
                display="flex"
                flexDirection="column"
                gap="1px"
              >
                <Text fontWeight={600} marginLeft={3} marginTop={3}>
                  {convoData.data ? convoData.data.title : null}
                </Text>
                <Text fontWeight={400} marginLeft={3} fontSize={13}>
                  {" "}
                  {convoData?.data ? convoData.data.creator.firstName : null}
                </Text>

                <Box
                  overflow="scroll"
                  height={"55vh"}
                  position={"absolute"}
                  top="55%"
                  left="50%"
                  transform="translate(-50%,-50%)"
                  width={[
                    "100%", // 0-30em
                    "100% ", // 30em-48em
                    "720px", // 48em-62em
                    "725px", // 62em+
                  ]}
                >
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add People</ModalHeader>
                      <ModalHeader>
                        {error.length > 1 && <Text>{error}</Text>}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Input
                          variant="flushed"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                        <HStack spacing={4}>
                          {participants.map((size) => (
                            <Tag
                              marginTop={"2px"}
                              size={"sm"}
                              key={size}
                              borderRadius="full"
                              variant="solid"
                              colorScheme="green"
                            >
                              <TagLabel>{size}</TagLabel>
                              <TagCloseButton />
                            </Tag>
                          ))}
                        </HStack>
                        <Box display="flex" gap="20px" marginTop="100px"></Box>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          isLoading={addPersonLoading}
                          mr={3}
                          onClick={() =>
                            setParticipants([...participants, email])
                          }
                        >
                          Add Participant
                        </Button>
                        <Button
                          colorScheme="blue"
                          isLoading={addPersonLoading}
                          mr={3}
                          onClick={addPerson}
                        >
                          Submit
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <Box display={"flex"} flexDirection="column" gap="5px">
                    {messageData != null &&
                      messageData.map((message: any) => {
                        return (
                          <Message
                            owner={message.senderId._id}
                            firstName={message.senderId.firstName}
                            currentUserId={currentUserId}
                            message={message.content}
                          />
                        );
                      })}
                  </Box>
                </Box>
              </Box>
              <Button
                colorScheme={"teal"}
                position="absolute"
                right={0}
                margin={1}
                onClick={onOpen}
              >
                Add People
              </Button>
              <Button
                colorScheme={"teal"}
                position="absolute"
                right={150}
                margin={1}
                onClick={setParticipantsModalOpen}
              >
                <BsPerson />
              </Button>

              <InputGroup size="md" position="absolute" bottom={0}>
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Enter message 🤡"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    isLoading={messageButtonLoading}
                    onClick={sendMessage}
                  >
                    M
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};
