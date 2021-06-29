import { useState } from 'react';
import GoogleButton from 'react-google-button';
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
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import feathersClient, { rest, authentication } from '@feathersjs/client';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

async function registerUser(name, email, password) {
  const app = feathersClient();
  const restClient = rest('http://localhost:3030');
  app.configure(restClient.fetch(window.fetch));
  app.configure(authentication({ storageKey: 'auth' }));
  const users = app.service('users');
  users.create({
    name,
    email,
    password,
  });
}

export default function Registration({ setRegistrationEmail }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  let history = useHistory();

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name, username, password);
    if (!username || !password || !name) {
      setError('Pastikan data yang anda masukkan lengkap');
      return;
    }
    await registerUser(name, username, password);
    console.log('Berhasil!');
    setRegistrationEmail(username);
    history.push('/login');
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
        <Heading color="teal">Aplikasi Kurs</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Text fontSize="xl" color="teal" fontWeight="bold">
            Sign Up
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <FormLabel color="teal">Your name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    borderColor="gray.300"
                    _placeholder={{ color: 'gray.300' }}
                    type="text"
                    placeholder="Name"
                    textColor="black"
                    onChange={e => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
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
                colorScheme="teal"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="black">
        Sudah punya akun?{' '}
        <Link as={ReactRouterLink} color="teal.500" to="/login">
          Sign In
        </Link>
      </Box>
      <Box>
        <a href="http://localhost:3030/oauth/google">
          <GoogleButton />
        </a>
      </Box>
    </Flex>
  );
}
