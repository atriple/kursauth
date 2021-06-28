import React, { useState } from 'react';
import {
  ChakraProvider,
  Code,
  Text,
  Flex,
  Box,
  Spacer,
  Button,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Kurs from './Kurs';
import Registration from './Registration';
import LogIn from './LogIn';
import { Logo } from './Logo';

export default function App() {
  const [token, setToken] = useState();

  // if (!token) {
  //   return <LogIn setToken={setToken} />;
  // }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex h="80px" p={5} borderBottom="1px" borderColor="telegram.500">
          <Box pl="2">
            <Logo h="40px" pointerEvents="none" />
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme="telegram" mr="4" variant="outline">
              Sign Up
            </Button>
            <Button colorScheme="telegram" variant="outline">
              Log in
            </Button>
          </Box>
        </Flex>
        <Switch>
          <Route path="/kurs">
            <Kurs />
          </Route>
          <Route path="/login">
            <LogIn setToken={setToken} />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
