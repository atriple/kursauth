import { useState } from "react";
import GoogleButton from "react-google-button";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="facebook.400">Kurs App</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Text fontSize="xl" color="teal" fontWeight="bold">Login</Text>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <FormLabel color="teal">E-mail</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input borderColor="gray.300" _placeholder={{ color:'gray.300' }} type="email" placeholder="name@example.com" textColor="black"/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color="teal">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    borderColor="gray.300"
                    _placeholder={{ color:'gray.300' }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    textColor="black"
                  />
                  <InputRightElement width="4.5rem">
                    <Button color="gray" h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link color="gray">forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="facebook"
                width="full"
                textColor="white.300"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="black">
        Don't have an account?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
      <GoogleButton onClick={() => { console.log('Google button clicked') }} />
    </Flex>
  );
};

export default App;