import { Box, Highlight, Text, WrapItem } from "@chakra-ui/react";
interface Message {
  message: string;
  owner: string;
  currentUserId: string;
  firstName: string;
}
function Message(props: Message) {
  const currentUserId = JSON.parse(
    sessionStorage.getItem("userData") || "{}"
  )._id;

  return (
    <Box
      bg={props.owner == currentUserId ? "teal" : "orange"}
      maxWidth="60%"
      paddingBottom={30}
      w="fit-content"
      borderRadius={"30px"}
      position="relative"
      right={props.owner == currentUserId ? "0px" : "-150px"}
      paddingTop="20px"
      color="white"
    >
      <Text padding={4}>{props.message}</Text>
      <Text
        isTruncated
        noOfLines={1}
        position={"absolute"}
        fontSize="14px"
        fontWeight={600}
        right="2px"
        bottom="10px"
      >
        {props.firstName}
      </Text>
    </Box>
  );
}

export default Message;
