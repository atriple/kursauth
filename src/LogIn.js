import { useState } from 'react';
// import GoogleButton from "react-google-button";
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
  Text,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import feathersClient, { rest, authentication } from '@feathersjs/client';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

async function loginUser(email, password) {
  const app = feathersClient();
  const restClient = rest('http://localhost:3030');
  app.configure(restClient.fetch(window.fetch));
  app.configure(authentication({ storageKey: 'auth' }));
  app
    .authenticate({ strategy: 'local', email, password })
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

export default function LogIn({ setToken }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(username, password);
    if (!username || !password) {
      setError('Masukkan username/password!');
      return;
    }
    await loginUser(username, password);
  };

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
        <Heading color="facebook.400">Aplikasi Kurs</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Text fontSize="xl" color="teal" fontWeight="bold">
            Login
          </Text>
          <form onSubmit={handleSubmit}>
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
                  <Input
                    borderColor="gray.300"
                    _placeholder={{ color: 'gray.300' }}
                    type="email"
                    placeholder="name@example.com"
                    textColor="black"
                    onChange={e => setUsername(e.target.value)}
                  />
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
                    _placeholder={{ color: 'gray.300' }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    textColor="black"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      color="gray"
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text textColor="red.400">{error}</Text>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="black">
        Don't have an account?{' '}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
      {/* <GoogleButton
        onClick={() => {
          console.log('Google button clicked');
        }}
      /> */}
    </Flex>
  );
}
