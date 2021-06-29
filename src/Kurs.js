import React, { useEffect, useState } from 'react';
import qs from 'querystring';
import {
  ChakraProvider,
  Divider,
  Heading,
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  theme,
} from '@chakra-ui/react';
import KursBca from './KursBca';
import KursEcb from './KursEcb';

function Kurs() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  const [sig, setSig] = useState([]);
  const [bca, setBCA] = useState([]);
  const [latestUpdateBca, setLatestUpdateBca] = useState();
  const [responseEcb, setResponseEcb] = useState([]);
  const [latestUpdateEcb, setLatestUpdateEcb] = useState();

  useEffect(() => {
    async function fetchDataBca() {
      const bcaAuthResponse = await fetch(
        'https://sandbox.bca.co.id/api/oauth/token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ZDc3MzMwMWYtMzU1OC00OWIzLTg5ZWQtMWU2NDc2MmI0ZmQ2OmU1YzRmYjRlLWYyZTAtNGZjMi1iMmNhLWE4MWUwOWYzN2RlMg==',
          },
          body: qs.stringify({
            grant_type: 'client_credentials',
          }),
        }
      )
        .then(response => response.json())
        .catch(error => console.error(error));
      // .finally(() => setLoading(false));
      console.log(bcaAuthResponse);
      setToken(bcaAuthResponse.access_token);

      const sigBca = await fetch(
        'https://sandbox.bca.co.id/utilities/signature',
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            Timestamp: timestamp,
            URI: '/general/rate/forex',
            AccessToken: bcaAuthResponse.access_token,
            APISecret: '3670d40d-9b53-4b2a-a9bd-f50d46a8cbca',
            HTTPMethod: 'GET',
          },
        }
      )
        .then(response => response.text())
        // .then(text => {
        //   console.log(text);
        //   return setSig(text.split('CalculatedHMAC: ')[1].trim());
        // })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
      console.log(sigBca);
      await setSig(sigBca.split('CalculatedHMAC: ')[1].trim());

      const ratebca = await fetch(
        'https://sandbox.bca.co.id/general/rate/forex',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + bcaAuthResponse.access_token,
            // 'Content-Type': 'application/json',
            // 'Origin': '',
            'X-BCA-Key': '0c7db875-58e3-4472-96e6-eb854f945f1e',
            'X-BCA-Timestamp': timestamp,
            'X-BCA-Signature': sigBca.split('CalculatedHMAC: ')[1].trim(),
          },
          // body: {
          //   CurrencyCode: 'USD',
          //   RateType: 'bn'
          // }
        }
      )
        .then(response => response.json())
        // .then(res => console.log(res))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
      console.log(ratebca.Currencies);
      await setBCA(ratebca.Currencies);
      await setLatestUpdateBca(
        ratebca.Currencies[2].RateDetail[0].LastUpdate.split('T')[0]
      );
    }
    async function fetchDataEcb() {
      console.log('Call ECB');
      const rateidr = await fetch('https://api.frankfurter.app/latest?from=IDR')
        .then(resp => resp.json())
        .catch(error => console.error(error));
      console.log(rateidr.rates);
      setResponseEcb(rateidr.rates);
      setLatestUpdateEcb(rateidr.date);
    }
    fetchDataBca();
    fetchDataEcb();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid
          minH="100vh"
          p={5}
          templateColumns="repeat(12, 1fr)"
          gap={4}
          pt={10}
        >
          {/* <Grid minH="100vh" p={3}> */}
          {/* <GridItem colSpan={1} bg="tomato" /> */}
          <GridItem colStart={2} colEnd={7}>
            <VStack spacing={8}>
              <Heading as="h2" size="lg">
                Nilai Kurs BCA
              </Heading>
              <Divider />
              <Text fontSize="xl">
                Terakhir diperbarui pada {latestUpdateBca}
              </Text>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                overflow="hidden"
                p={5}
              >
                <KursBca response={bca} />
              </Box>
            </VStack>
          </GridItem>
          <GridItem colStart={7} colEnd={12}>
            <VStack spacing={8}>
              {/* <Logo h="40vmin" pointerEvents="none" /> */}
              <Heading as="h2" size="lg">
                Nilai Kurs ECB
              </Heading>
              <Divider />
              <Text fontSize="xl">
                Terakhir diperbarui pada {latestUpdateEcb}
              </Text>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                overflow="hidden"
                p={5}
              >
                <KursEcb response={responseEcb} />
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Kurs;
