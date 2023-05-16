import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Image,
  useToast,
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { API_URL } from "lib/api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  currentUserData,
  currentUserId,
  currentUserToken,
} from "../../../utils/currentUser";
import { useCookies } from "react-cookie";
type Props = {};

function Upload({}: Props) {
  const navigate = useNavigate();
  const [images, setImage] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>({});
  const [postHeading, setPostHeading] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");
  const [postHeadingValidator, setPostHeadingValidator] = useState<any>({
    valid: true,
    message: "",
  });
  const [postDescriptionValidator, setPostDescriptionValidator] = useState<any>(
    { valid: true, message: "" }
  );
  const [cookies, setCookie, removeCookie] = useCookies();

  function onImageChange(e: any) {
    setImage([...e.target.files]);
  }
  const toast = useToast();
  //Upload image
  function UploadPost() {
    if (
      postDescription.length < 50 &&
      postHeading.length < 25 &&
      postDescription.length > 0 &&
      postHeading.length > 0
    ) {
      var formData = new FormData();
      formData.append("image", images[0]);
      formData.append("postHeading", postHeading);
      formData.append("ownerName", currentUserData.firstName);
      formData.append("description", postDescription);

      axios
        .post(`${API_URL}post`, formData, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((response) => {
          navigate("/");
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
    } else {
      toast({
        title: "Validation Error.",
        description:
          "The length of title/description is too short/long. Code 001",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function uploadForm() {
    if (
      postDescription.length < 50 &&
      postHeading.length < 25 &&
      postDescription.length > 0 &&
      postHeading.length > 0
    ) {
    } else if (images.length == 0) {
      toast({
        title: "Validation Error.",
        description: "An image is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Validation Error.",
        description: "The length of title/description is too short/long.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function onPostHeadingChange(e: any) {
    setPostHeading(e.target.value);
  }

  function onPostDescriptionChange(e: any) {
    setPostDescription(e.target.value);
  }
  useEffect(() => {
    if (images.length > 0) {
      var url: any = URL.createObjectURL(images[0]);
      setImageUrl(url);
    }
  }, [images]);
  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Upload Post
          </Heading>
          <FormControl id="userName">
            <FormLabel>Post Image</FormLabel>
            <Stack direction={["column"]} spacing={6}>
              <Center>
                <Image src={imageUrl}></Image>
              </Center>
              <Center w="full">
                <input type="file" onChange={onImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Post Heading</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={onPostHeadingChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={onPostDescriptionChange}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              onClick={UploadPost}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
}

export default Upload;
