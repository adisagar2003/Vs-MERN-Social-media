import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        {new Date().getFullYear()} -{" "}
        <Link href="https://github.com/adisagar2003" isExternal>
          Aditya Sagar
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
