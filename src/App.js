import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Text,
  Flex,
  Box,
  Spacer,
  Button,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Kurs from './Kurs';
import Registration from './Registration';
import LogIn from './LogIn';
import { Logo } from './Logo';
import feathersClient, { rest, authentication } from '@feathersjs/client';
import OAuth from './OAuth';

const app = feathersClient();
const restClient = rest('http://localhost:3030');
app.configure(restClient.fetch(window.fetch));
app.configure(authentication({ storageKey: 'auth' }));

export default function App() {
  const [token, setToken] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [name, setName] = useState();

  useEffect(async () => {
    document.title = 'Aplikasi Kurs';
    setToken(localStorage.getItem('auth'));
  }, []);

  useEffect(async () => {
    if (!token) return;
    const response = app
      .service('authentication')
      .create({
        strategy: 'jwt',
        accessToken: token,
      })
      .then(data => setName(data.user.name));
  }, [token]);

  const handleClick = e => {
    e.preventDefault();
    localStorage.removeItem('auth');
    setToken(false);
  };

  const navigationLoggedOut = (
    <Flex h="80px" p={5} borderBottom="1px" borderColor="telegram.500">
      <Box pl="2">
        <Logo h="40px" pointerEvents="none" />
      </Box>
      <Spacer />
      <Box>
        <Link to="/register">
          <Button colorScheme="telegram" mr="4" variant="outline">
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button colorScheme="telegram" variant="outline">
            Log in
          </Button>
        </Link>
      </Box>
    </Flex>
  );

  const navigationLoggedIn = (
    <Flex h="80px" p={5} borderBottom="1px" borderColor="telegram.500">
      <Box pl="2">
        <Logo h="40px" pointerEvents="none" />
      </Box>
      <Spacer />
      <Text fontSize="xl">Selamat datang, {name}</Text>
      <Spacer />
      <Box>
        <Button
          colorScheme="telegram"
          mr="4"
          variant="outline"
          onClick={handleClick}
        >
          Sign Out
        </Button>
      </Box>
    </Flex>
  );

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {token ? navigationLoggedIn : navigationLoggedOut}
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/kurs" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/kurs">
            {token ? <Kurs /> : <Redirect to="/login" />}
          </Route>
          <Route path="/kurs-dev">
            <Kurs />
          </Route>
          <Route path="/login">
            {token ? (
              <Redirect to="/kurs" />
            ) : (
              <LogIn setToken={setToken} registrationEmail={registerEmail} />
            )}
          </Route>
          <Route path="/oauth">
            <OAuth setToken={setToken} />
          </Route>
          <Route path="/register">
            {token ? (
              <Redirect to="/kurs" />
            ) : (
              <Registration setRegistrationEmail={setRegisterEmail} />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
