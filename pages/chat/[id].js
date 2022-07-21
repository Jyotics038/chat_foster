import React from "react";
import Sidebar from "../../components/Sidebar";
import { Avatar } from "@chakra-ui/avatar";
import { Heading, Text, Flex } from "@chakra-ui/layout";
import { FormControl, Input, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
import { useState } from "react";
import { useRef, useEffect } from "react";
import Topbar from "../../components/Topbar";

const Bottombar = ({ id, user }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl className="text-white" p={3} onSubmit={sendMessage} as="form">
      <Input
        placeholder="Type a message..."
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};
export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  //console.log(id);

  const [user] = useAuthState(auth);

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);

  const [chat] = useDocumentData(doc(db, "chats", id));

  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "#d8bfd8" : "green.100"}

          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  // const getMessages = () => {
  //   messages?.map((msg) => {
  //     const sender = msg.sender === user.email;

  //     return (
  //       <div
  //         key={Math.random()}
  //         alignSelf={sender ? "flex-start" : "flex-end"}
  //         bg={sender ? "blue.100" : "green.100"}
  //         className="flex w-fit max-w-fit min-w-[100px] rounded-lg p-3 m-1"
  //       >
  //         <Text>{msg.text}</Text>
  //       </div>
  //     );

  //     // return (
  //     //   <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
  //     //     <Text>{msg.text}</Text>
  //     //   </Flex>
  //     // )
  //   });
  // };

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [messages]);

  return (
    <div className="flex h-[100vh]  dark:bg-[#101f1f] bg-white">
      <Head>
        <title>Chat Foster</title>
      </Head>
      <Sidebar />

      <div className="flex-1 dark:bg-[#1f2a26] bg-[#f0ffff] flex flex-col">
        <Topbar email={getOtherEmail(chat?.users, user)} />
        <div className="flex-1 flex flex-col pt-4 mx-5 overflow-y-auto no-scrollbar text-black">
          {/* <div className="flex bg-blue-100 w-fit max-w-fit min-w-[100px] rounded-lg p-3 m-1">
           <Text>This is message</Text>
           </div> */}
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </div>
        <Bottombar id={id} user={user} />
      </div>
    </div>
  );
}
