import {
  Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
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
  } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
  import {useState} from "react"; 
import axios from 'axios';
import { API_URL } from 'lib/api/Api';

  //Setting up navigate


export default function Login(){
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading ,setLoading] = useState(false);

    function SignIn(){
      setLoading(true);
      axios.post(`${API_URL}auth/login`, {
        email: email,
        password: password
      },{
      headers:{
        'Content-Type':'application/json'}
      })
      .then(function (response) {
        setLoading(true);
        console.log(response);
        cookies.set('accessToken',response.data.token, { path: '/' });
        console.log(response.data.userData);

        sessionStorage.setItem('userData',JSON.stringify(response.data.userData));
  
        location.replace("/");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      setLoading(false);
      setEmail("");
      setPassword("");
      });
      
    }
    const navigate = useNavigate();
  
    
    return (<Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
     
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue"  onClick={()=>navigate("/register")}>
                Sign up
              </Button>
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
          {error.length>1 && (
            <Alert status='error'>
  <AlertIcon />
  <AlertTitle>Error!</AlertTitle>
  <AlertDescription>{error}</AlertDescription>
</Alert>
          )} 
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email" >Email</FormLabel>
                <Input id="email" type="email" onChange={(e)=>setEmail(e.target.value)} />

                <FormLabel htmlFor="email" >Password</FormLabel>
                <Input onChange={(e)=>setPassword(e.target.value)} id="email" type="password" />
              </FormControl>
             
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" isLoading={loading} onClick={SignIn}>Sign in</Button>
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
    </Container>)
}