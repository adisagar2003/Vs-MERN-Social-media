import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'
import axios from 'axios';
import { API_URL } from 'lib/api/Api';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
  
  export const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [confirmPassword,setConfirmPassword] = useState<string>("");
    const [firstName,setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [loading,isLoading] = useState<boolean>(false);
    const [response,setResponse] = useState<object|null>(null);
    const [error, setError] = useState("");
    const toast = useToast();

    function submitForm(){  
     


      isLoading(true);

      if (firstName!="" && lastName!="" && password!="" && email!=""){
        axios.post(`${API_URL}user/register`,{
          email: email,
          password:password, 
          confirmPassword:confirmPassword,
          firstName:firstName,
          lastName:lastName,
userName: userName
        }).then((result)=>{

          toast({
            title: 'Account Created',
            description: 'Redirecting...',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        
          console.log(result);
          isLoading(false);
          location.href= "/";
        }).catch((err)=> {
          isLoading(false);
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          console.log(err)})
      }else
      {

isLoading(false);
      }
   
    }

    return(
  
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Register an account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Link to="/login">
              <Button variant="link" colorScheme="blue">
                Sign in
              </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={e=>setEmail(e.target.value)} />
                <FormLabel htmlFor="userANme">Username</FormLabel>
                <Input id="email" type="email" onChange={e=>setUserName(e.target.value)} />

                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="passowrd" type="password" onChange={e=>setPassword(e.target.value)}/>
                <FormLabel htmlFor="email">Confirm Password</FormLabel>
                <Input id="confirm password" type="password" onChange={e=>setConfirmPassword(e.target.value)} />
                <FormLabel htmlFor="email">First Name</FormLabel>
                <Input id="first name" type="text" onChange={e=>setFirstName(e.target.value)} />
                <FormLabel htmlFor="email">Last Name</FormLabel>
                <Input id="last name" type="text" onChange={e=>setLastName(e.target.value)} />
              </FormControl>
              
             
            </Stack>
            <HStack justify="space-between">
             
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" isLoading={loading} onClick={submitForm}>Register</Button>
              <HStack>
                {/* <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider /> */}
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>)}