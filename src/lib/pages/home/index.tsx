import { Alert, Button, Center, Divider, Flex, Grid, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { UserContext } from "lib/context/UserContext";
import {useState} from "react";
import CTASection from "./components/CTASection";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";
import {useContext} from "react";
import {useEffect} from "react";
import Cookies, { Cookie } from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { API_URL } from "lib/api/Api";
import axios from "axios";
import useCookies from "react-cookie/cjs/useCookies";
import { BeatLoader, ClipLoader } from "react-spinners";
import ConversationCard from "./components/ConversationCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const [creatorData,setCreatorData] = useState<any>({data:[]});
  const [otherCreations,setOtherCreations ] = useState<any>({data:[]});
  const [creatorDataLoading, setCreatorDataLoading] = useState<boolean>(true);
  const [otherLoading, setOtherLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie,removeCookie] = useCookies(['accessToken']);
  const [title, setTitle] = useState<string>("");
  const [createConversationLoading, setCreateConversationLoading] = useState<boolean>(false);
const userData:any =  useContext(UserContext);

//create a conversation


useEffect(()=>{
  axios.get(`${API_URL}conversation/creator`,{
    headers:{
      "Authorization":`Bearer ${cookies.accessToken}`
    }
  }).then((result)=>{
  console.log(result);
  setCreatorData(result.data);
  setCreatorDataLoading(false);
  result = result;
  
  }).catch((err)=>{setCreatorData(err.message); });
},[createConversationLoading])

function createConversation(){
  setCreateConversationLoading(true);
  if (title!=""){
    axios.post(`${API_URL}conversation`,{
      title:title
    },{
      headers:{
        Authorization: `Bearer ${cookies.accessToken}`
      }
    }).then((result)=>{
      console.log(result);
      
      setCreateConversationLoading(false);


    }).catch((err)=>{
      setCreateConversationLoading(false);
      console.log(err);

    })
  }else{
alert("Enter title ");
setCreateConversationLoading(false);
  }
}


//creator data fetch
useEffect(()=>{
  axios.get(`${API_URL}conversation/creator`,{
    headers:{
      "Authorization":`Bearer ${cookies.accessToken}`
    }
  }).then((result)=>{
  console.log(result);
  setCreatorData(result.data);
  setCreatorDataLoading(false);
  result = result;

  
  
  }).catch((err)=>{setCreatorData(err.message); });
},[])
//Open sample modal
useEffect(()=>{
  onEditOpen();
},[])



//Other data fetching

useEffect(()=>{
  axios.get(`${API_URL}conversation/participants`,{
    headers:{
      "Authorization":`Bearer ${cookies.accessToken}`
    }
  }).then((result)=>{
  console.log(result);
  setOtherCreations(result.data);
  setOtherLoading(false);
  result = result;
  
  }).catch((err)=>{setCreatorData(err.message); });
},[])

  return (
    <div>

      {userData._id && (
         <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Create Room</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
         
           <Input onChange={(e)=>setTitle(e.target.value)} variant='filled' placeholder='Enter room title' />
           <Button isLoading={createConversationLoading} colorScheme="blue" onClick={createConversation} >
            Create Conversation
           </Button>

           </ModalBody>
           </ModalContent>
         </Modal>


  
         
      )}
      {userData._id ? <Center flexDirection={'column'} >
      <Button
  
  colorScheme='blue'
  position="fixed"
  bottom="10"
  right="10"
  spinner={<BeatLoader size={8} color='white' />}
  onClick={onOpen}
>


  Create Room
</Button>

 {/* {Modal} */}

      






      {/* End of Modal */}
        <Text fontSize={'4xl'}>Owned Conversations</Text>
        <SimpleGrid minChildWidth='140px' spacing='40px'>
        {creatorDataLoading ? (<div><ClipLoader color="cyan" /></div>):(<SimpleGrid minChildWidth='200px' spacing='10px'>{creatorData.data.map((conversation:any)=>{
        return  (
          <ConversationCard title={conversation.title} id={conversation._id} owner={conversation.creator.firstName} />)
        })}</SimpleGrid>)}
          {creatorData.data.length==0 && (<Text>Create a room and add people on it </Text>)}
        </SimpleGrid>
        
        <Divider marginTop={4} />
        
        
        
        <Text fontSize={'3xl'}>Other Conversations</Text>
        
        {otherLoading ? (<div><ClipLoader color="cyan" /></div>):(<Flex direction={'column'} gap={10}>
          {otherCreations.data.length==0 && (<Text>No rooms exist where you were added </Text>)}
          {otherCreations.data.map((conversation:any)=>{

          
        return  (
          <ConversationCard title={conversation.title} id={conversation._id} owner={conversation.creator.firstName} />)
        })}</Flex>)}
      </Center>: <Grid gap={10}>
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
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
            <Button colorScheme='blue' mr={3} onClick={onEditClose}>
              Close
            </Button>
     
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Button onClick={()=>navigate("/login")}>Login</Button>
      <Button onClick={()=>navigate("/register")}>Register</Button>
      
      </Grid>}
      
    </div>
  );
};

export default Home;
