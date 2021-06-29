import React, { useEffect, useState } from 'react';
import qs from 'querystring';
import {
  ChakraProvider,
  Divider,
  Heading,
  Input,
  Box,
  Text,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Flex,
  VStack,
  FormControl,
  SimpleGrid,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Code,
  Stack,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spacer,
  theme,
  Button,
  ButtonGroup,
  Container,
  chakra,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function Kurs() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  const [sig, setSig] = useState([]);
  const [bca, setBCA] = useState([]);

  useEffect(async () => {
    const bcaAuthResponse = await fetch('https://sandbox.bca.co.id/api/oauth/token', {
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

    const sigBca = await fetch('https://sandbox.bca.co.id/utilities/signature', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Timestamp: timestamp,
        URI: '/general/rate/forex',
        AccessToken: bcaAuthResponse.access_token,
        APISecret: '3670d40d-9b53-4b2a-a9bd-f50d46a8cbca',
        HTTPMethod: 'GET',
      },
    })
      .then(response => response.text())
      // .then(text => {
      //   console.log(text);
      //   return setSig(text.split('CalculatedHMAC: ')[1].trim());
      // })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
    console.log(sigBca);
    setSig(sigBca.split('CalculatedHMAC: ')[1].trim());

    const ratebca = await fetch('https://sandbox.bca.co.id/general/rate/forex', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + bcaAuthResponse.access_token,
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
    })
      .then((response) => response.json())
      // .then(res => console.log(res))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log(ratebca.Currencies);
    setBCA(ratebca.Currencies);
  }, []);

  const [b2, setB2] = useState([]);

  // var parseString = require('xml2js').parseString;
  // useEffect(() => {
  //   fetch('https://cors.bridged.cc/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
  //     .then(response => response.text())
  //     .then(text => {
  //       // const result = convert.xml2json(text, { compact: true, spaces: 1 });
  //       // // console.log(result['gesmes:Envelope']['Cube']['Cube']['Cube'][0]['_attributes']['time']);
  //       // console.log(result);
  //       parseString(text, { mergeAttrs: true }, function (err, result) {
  //         console.log(JSON.stringify(result['gesmes:Envelope'].Cube[0].Cube[0].Cube));
  //         return setECB(JSON.stringify(result['gesmes:Envelope'].Cube[0].Cube[0].Cube, null, 4));
  //       });

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // 
  // }, [])




  useEffect(async () => {
    // const host = 'api.frankfurter.app';
    const rateidr = await fetch('https://api.frankfurter.app/latest?from=IDR')
      .then(resp => resp.json())
      .catch((error) => console.error(error))
    // .then((data) => {
    //   console.log(data);
    // });
    console.log(rateidr.rates);
    setB2(rateidr.rates);
  }, []);
  const math = require('mathjs')
  // const bca2 = JSON.parse(bca);
  const data = React.useMemo(() =>
    Object.keys(b2).map((key, index) => ({
      currency: key,
      buy: math.round(1 / b2[key], 2),
    })), []
  );

  // const data = React.useMemo(() =>
  //   bca.map(item => ({
  //     currency: item.CurrencyCode,
  //     buy: item.RateDetail[0].Buy,
  //     sell: item.RateDetail[0].Sell,
  //   })), []
  // );

  // const data = React.useMemo(
  //   () => [
  //     {
  //       currency: 'USD',
  //       buy: '15',
  //       sell: '15',
  //     },
  //   ],
  //   []
  // );

  // const data2 = React.useMemo(
  //   () => [
  //     {
  //       currency: 'USD',
  //       buy: '20',
  //       sell: '15',
  //     },
  //   ],
  //   []
  // );
  const columns = React.useMemo(
    () => [
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'Buy',
        accessor: 'buy',
      },
    ],
    []
  );
  const columns2 = React.useMemo(
    () => [
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'Buy',
        accessor: 'buy',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

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
                Nilai Kurs

              </Heading>
              <Divider />
              <Box
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                overflow="hidden"
                p={5}
              >
                <Table {...getTableProps()}>
                  <Thead>
                    {headerGroups.map(headerGroup => (
                      <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <Th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            isNumeric={column.isNumeric}
                          >
                            {column.render('Header')}
                            <chakra.span pl="4">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon aria-label="sorted descending" />
                                ) : (
                                  <TriangleUpIcon aria-label="sorted ascending" />
                                )
                              ) : null}
                            </chakra.span>
                          </Th>
                        ))}
                      </Tr>
                    ))}
                  </Thead>
                  <Tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                      prepareRow(row);
                      return (
                        <Tr {...row.getRowProps()}>
                          {row.cells.map(cell => (
                            <Td
                              {...cell.getCellProps()}
                              isNumeric={cell.column.isNumeric}
                            >
                              {cell.render('Cell')}
                            </Td>
                          ))}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>

            </VStack>
          </GridItem>
          <GridItem colStart={7} colEnd={12}>
            <VStack spacing={8}>
              {/* <Logo h="40vmin" pointerEvents="none" /> */}
              <Heading as="h2" size="lg">
                Nilai Kurs
              </Heading>
              <Divider />
              <Box
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                overflow="hidden"
                p={5}
              >
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );

}

export default Kurs;
