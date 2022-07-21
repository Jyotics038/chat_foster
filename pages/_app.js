import "../styles/globals.css";
import { ChakraProvider, Spinner, Center } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import Login from "../components/Login";
import {ThemeProvider} from 'next-themes';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  // return <Component {...pageProps} />
  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }
  if(!user){
    return(
      <ChakraProvider>
        <Login/>
      </ChakraProvider>
    )
  }
  return (
    <ThemeProvider attribute="class">
    <ChakraProvider>
      <Component {...pageProps} />
      
    </ChakraProvider>
    </ThemeProvider>
  );
}

export default MyApp;
