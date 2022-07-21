import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection,addDoc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import {useRouter} from "next/router";

import { Flex, Heading } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));

  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

   //console.log(chats);

   const router= useRouter();
   const redirect=(id)=>{
    router.push(`/chat/${id}`);
  }

  const chatExists=email=>chats?.find(chat=>(chat.users.includes(user.email)&&chat.users.includes(email)));
    
  const newChat=async()=>{
    const input=prompt("Enter email of chat recipient");
     if(!chatExists(input)&&(input!=user.email)){
      await addDoc(collection(db,"chats"),{users:[user.email,input]})
     }
    
  }

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        
        <Buttons
          className="bg-gray-200 dark:bg-gray-600 " 
          onClick={() => setTheme("light")}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </Buttons>
      );
    } else {
      return (
        <Buttons className="bg-gray-200" onClick={() => setTheme("dark")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </Buttons>
      );
    }
  };

  const chatList = () => {
    return( 
    chats?.filter(chat=>chat.users.includes(user.email))
    .map((chat) => (
      <div key={Math.random()}
        className="flex p-3 items-center dark:hover:bg-[#3e3291] 
              cursor-pointer dark:text-white hover:bg-[#20b2aa] text-black"
              onClick={()=>redirect(chat.id)}
      >
        <Avatar src="" marginEnd={3} />
        <Text>{getOtherEmail(chat.users,user)}</Text>
      </div>
    )))
  }

  return (
    <div
      className="flex w-[300px]  h-[100%]
    border-solid border-x-[1px] border-black dark:bg-[#101f1f]  bg-[#e6e8fa]
    flex-col"
    >
      <div
        className="h-[81px] w-[100%]  flex
        items-center justify-between border-black
        border-solid p-3  dark:bg-[#1f2a26]
        "
      >
        <div className="flex items-center dark:text-white text-black">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
          
        </div>
        <div className="items-center">
        
        <IconButton
          size="sm"
          isRound
          icon={<ArrowLeftIcon />}
          onClick={() => signOut(auth)}
        />
       
       {renderThemeChanger()}
        
       
        </div>
        
        {/* //call */}
        
      </div>
      
      <Button className="m-5 p-4 " onClick={()=> newChat()}>New Chat</Button>

      <div className="flex flex-col overflow-y-auto no-scrollbar flex-1 ">
        {chatList()}
      </div>
    </div>
  );
};

export default Sidebar;
