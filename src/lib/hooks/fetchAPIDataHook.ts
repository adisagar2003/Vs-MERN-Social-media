import axios from "axios";
import { API_URL } from "lib/api/Api";
import {useState, useEffect} from "react";
import { currentUserId, currentUserToken } from "../../utils/currentUser";
export type TApiResponse = any;

  export const useApiGet = (url: string): TApiResponse => {

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    try{

        function getAPIData(){
            setLoading(true);
            console.log(currentUserToken())
            axios.get(url ,{
                headers:{
                    Authorization:`Bearer ${currentUserToken()}`
                }
            }).then((result)=>{
                setData(result);
                setLoading(false);
    
    
            });
        }

        useEffect(()=>{
            getAPIData();
        },[])
       

        return {data, loading, error, }
    }catch(err:any){
        setError(err.message);


    }
  };
