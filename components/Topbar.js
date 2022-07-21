import { Flex, Heading, Avatar } from "@chakra-ui/react";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Topbar({ email }) {

  return (
    <div
      className="flex items-center 
      h-[81px] w-[100%] p-5 dark:bg-[#1f2a26]  bg-[#f0ffff]  dark:text-white text:black
      "
    >
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
      
    </div>
  );
}
