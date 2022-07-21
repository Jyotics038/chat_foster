import React from "react";
import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Center, Stack, Button } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";


const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <>
      <div className="bg-[#778899]">
        <Head>
          <title>Login</title>
          
        </Head>

        <Center h="100vh">
          <Stack
            align="center"
            bgColor="gray.600"
            p={16}
            rounded="3xl"
            spacing={12}
            boxShadow="lg"
          >
            <Box
              bgColor="blue.500"
              w="fit-content"
              p={5}
              rounded="3xl"
              boxshadow="md"
            >
              <ChatIcon w="100px" h="100px" color="white" />
            </Box>
          
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full"
              onClick={() => signInWithGoogle("",{prompt:"select_account"})}
            >
              Sign In with Google
            </Button>
          </Stack>
        </Center>
      </div>
    </>
  );
};

export default Login;
