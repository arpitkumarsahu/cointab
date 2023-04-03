import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()
  const toast = useToast()
  const handleLogin = ()=>{
    const payload = {
        email: email,
        password: password
    }

    fetch("https://gray-poised-perch.cyclic.app/user/login",{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "content-type": "application/json"
        }
    })
    .then((res)=> res.json())
    .then((res)=> {
        if(res.token){
            localStorage.setItem("user", JSON.stringify(res))
            toast({
                title: "Login Success",
                position: "top",
                status: "success",
                isClosable: true,
              })
              navigate('/home')
        } else {
            toast({
                title: res.msg,
                position: "top",
                status: "error",
                isClosable: true,
              })
        }
    })
    
    
    .catch((err)=> console.log(err))
  }

  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              LogIn
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              </Stack>
              <Text>Dont have an account? <Link to={'/signup'} >Signup</Link> </Text>
              <Stack pt={6}></Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Login;
