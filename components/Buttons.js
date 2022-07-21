import {Flex } from "@chakra-ui/layout";

const Buttons = ({ children, className, onClick }) => {
    return (
        
        <button
        className={`p-2 rounded-2xl hover:ring-2 ml-[0.4rem]  hover:ring-gray-300 ${className}`}
        onClick={onClick} 
      >{children}</button>
        
      
    )
  }
  
  export default Buttons