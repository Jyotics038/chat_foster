import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";


const Home = () => {
  return (
    
      <div className="flex min-h-screen flex-col  justify-center py-2">
        <Head>
          <title>Chat Foster</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box h="100vh">
          <Sidebar />
        </Box>
      </div>
    
  );
};

export default Home;
