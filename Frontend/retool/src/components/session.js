import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        
        config.headers.Authorization = (token != null) ? `Token ${token}` : null;
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getVehicles = async (state) => {
    try{
        const res = await axios.get("https://retool-production.up.railway.app/car/", {});
        state(res.data);
    }catch(err){
        state(["NN"]);
    }
}

export function ValidateSession() {
  const [vehicles, setVehicles] = useState([]);  
  const router = useRouter()

  useEffect(() => {
    getVehicles(setVehicles);
    }, []);

  if (vehicles.length > 0){
    if (vehicles[0] == "NN"){
        if (router.pathname == '/'){
            router.push('/home')
        }else {
            router.push('/login')
        }
        return false;
    } else{
        return true;
    }
  } else {
    return false;
  }
  
}

export const setSessionCookie = (session) => {
    localStorage.clear();
    localStorage.setItem('Token', session);
    //Cookies.remove("session");
    //Cookies.set("session", session, { expires: 14 });
};
  
export const getSessionCookie = () => {
    //const sessionCookie = Cookies.get("session");
    const sessionCookie = typeof window !== 'undefined' ? localStorage.getItem('Token') : null;
    //if (sessionCookie === undefined) {
    //    return {};
    //} else {
    //    return JSON.parse(sessionCookie);
    //}
};

export const SessionContext = React.createContext(getSessionCookie());