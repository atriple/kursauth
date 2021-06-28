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
import { Logo } from './Logo';
import { rate } from './rate';

function Kurs() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();
  const [sig, setSig] = useState([]);

  useEffect(async () => {
    await fetch('https://sandbox.bca.co.id/api/oauth/token', {
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
    })
      .then(response => response.json())
      .then(res => res.access_token)
      .then(json => setToken(json))
      .catch(error => console.error(error));
    // .finally(() => setLoading(false));

    await fetch('https://sandbox.bca.co.id/utilities/signature', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Timestamp: timestamp,
        URI: '/general/rate/forex',
        AccessToken: token,
        APISecret: '3670d40d-9b53-4b2a-a9bd-f50d46a8cbca',
        HTTPMethod: 'GET',
      },
    })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        return setSig(text.split('CalculatedHMAC: ')[1].trim());
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   fetch('https://sandbox.bca.co.id/general/rate/forex', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Authorization':'Bearer '+{token},
  //       'Content-Type': 'application/json',
  //       'Origin':'',
  //       'X-BCA-Key':'',
  //       'X-BCA-Timestamp':'',
  //       'X-BCA-Signature':''
  //     },
  //     body: {
  //       CurrencyCode: 'USD',
  //       RateType: 'bn'
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then(res => res.ErrorMessage.Indonesian)
  //     .then((json) => setSig(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, [])

  // const data = React.useMemo(
  //   () => [
  //     {
  //       fromUnit: 'inches',
  //       toUnit: 'millimetres (mm)',
  //       factor: 25.4,
  //     },
  //     {
  //       fromUnit: 'feet',
  //       toUnit: 'centimetres (cm)',
  //       factor: 30.48,
  //     },
  //     {
  //       fromUnit: 'yards',
  //       toUnit: 'metres (m)',
  //       factor: 0.91444,
  //     },
  //   ],
  //   []
  // );

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'To convert',
  //       accessor: 'fromUnit',
  //     },
  //     {
  //       Header: 'Into',
  //       accessor: 'toUnit',
  //     },
  //     {
  //       Header: 'Multiply by',
  //       accessor: 'factor',
  //       isNumeric: true,
  //     },
  //   ],
  //   []
  // );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data }, useSortBy);

  // return (
  //   <ChakraProvider theme={theme}>
  //     <Box textAlign="center" fontSize="xl">

  //       <Grid
  //         minH="100vh"
  //         p={5} np
  //         templateColumns="repeat(12, 1fr)"
  //         gap={4}
  //         pt={10}
  //       >
  //         {/* <Grid minH="100vh" p={3}> */}
  //         {/* <GridItem colSpan={1} bg="tomato" /> */}
  //         <GridItem colStart={2} colEnd={9}>
  //           <VStack spacing={8}>
  //             <Heading as="h2" size="lg">
  //               Nilai Kurs
  //             </Heading>
  //             <Divider />
  //             <Box
  //               borderWidth="1px"
  //               borderRadius="lg"
  //               w="100%"
  //               overflow="hidden"
  //               p={5}
  //             >
  //               <Table {...getTableProps()}>
  //                 <Thead>
  //                   {headerGroups.map(headerGroup => (
  //                     <Tr {...headerGroup.getHeaderGroupProps()}>
  //                       {headerGroup.headers.map(column => (
  //                         <Th
  //                           {...column.getHeaderProps(
  //                             column.getSortByToggleProps()
  //                           )}
  //                           isNumeric={column.isNumeric}
  //                         >
  //                           {column.render('Header')}
  //                           <chakra.span pl="4">
  //                             {column.isSorted ? (
  //                               column.isSortedDesc ? (
  //                                 <TriangleDownIcon aria-label="sorted descending" />
  //                               ) : (
  //                                 <TriangleUpIcon aria-label="sorted ascending" />
  //                               )
  //                             ) : null}
  //                           </chakra.span>
  //                         </Th>
  //                       ))}
  //                     </Tr>
  //                   ))}
  //                 </Thead>
  //                 <Tbody {...getTableBodyProps()}>
  //                   {rows.map(row => {
  //                     prepareRow(row);
  //                     return (
  //                       <Tr {...row.getRowProps()}>
  //                         {row.cells.map(cell => (
  //                           <Td
  //                             {...cell.getCellProps()}
  //                             isNumeric={cell.column.isNumeric}
  //                           >
  //                             {cell.render('Cell')}
  //                           </Td>
  //                         ))}
  //                       </Tr>
  //                     );
  //                   })}
  //                 </Tbody>
  //               </Table>
  //             </Box>
  //           </VStack>
  //         </GridItem>
  //         <GridItem colStart={9} colEnd={12}>
  //           <VStack spacing={8}>
  //             {/* <Logo h="40vmin" pointerEvents="none" /> */}
  //             <Heading as="h2" size="lg">
  //               Rate Calculator
  //             </Heading>
  //             <Divider />
  //             <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
  //               <Container p={5}>
  //                 <Tabs
  //                   isFitted
  //                   variant="enclosed"
  //                   variant="soft-rounded"
  //                   colorScheme="blue"
  //                 >
  //                   <TabList>
  //                     <Tab>Buy</Tab>
  //                     <Tab>Sell</Tab>
  //                   </TabList>
  //                   <TabPanels>
  //                     <TabPanel>
  //                       <Stack spacing={5}>
  //                         <Select variant="flushed" placeholder="e-Rate">
  //                           <option value="option1">Bank Note</option>
  //                           <option value="option2">TT Counter</option>
  //                         </Select>
  //                         <Grid
  //                           templateRows="repeat(2, 1fr)"
  //                           templateColumns="repeat(5, 1fr)"
  //                           gap={4}
  //                         >
  //                           <GridItem colSpan={2}>
  //                             <FormControl id="curr">
  //                               <FormLabel>Currency</FormLabel>
  //                               <Select variant="flushed" placeholder="IDR">
  //                                 <option>USD</option>
  //                                 <option>SGD</option>
  //                               </Select>
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={3}>
  //                             <FormControl id="nominal">
  //                               <FormLabel>Amount</FormLabel>
  //                               <Input
  //                                 variant="flushed"
  //                                 placeholder="Nominal"
  //                               />
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={2}>
  //                             <FormControl id="curr">
  //                               <FormLabel>Currency</FormLabel>
  //                               <Select variant="flushed" placeholder="USD">
  //                                 <option value="IDR">IDR</option>
  //                                 <option value="SGD">SGD</option>
  //                               </Select>
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={3}>
  //                             <FormControl id="nominal">
  //                               <FormLabel>Amount</FormLabel>
  //                               <Input
  //                                 isDisabled
  //                                 variant="flushed"
  //                                 placeholder="0.00"
  //                               />
  //                             </FormControl>
  //                           </GridItem>
  //                         </Grid>
  //                         <Stack direction="column">
  //                           <Button colorScheme="blue" variant="solid">
  //                             Apply
  //                           </Button>
  //                           <Button colorScheme="blue" variant="ghost">
  //                             Reset
  //                           </Button>
  //                         </Stack>
  //                       </Stack>
  //                     </TabPanel>
  //                     <TabPanel>
  //                       <Stack spacing={5}>
  //                         <Select variant="flushed" placeholder="e-Rate">
  //                           <option value="option1">Bank Note</option>
  //                           <option value="option2">TT Counter</option>
  //                         </Select>
  //                         <Grid
  //                           templateRows="repeat(2, 1fr)"
  //                           templateColumns="repeat(5, 1fr)"
  //                           gap={4}
  //                         >
  //                           <GridItem colSpan={2}>
  //                             <FormControl id="curr">
  //                               <FormLabel>Currency</FormLabel>
  //                               <Select variant="flushed" placeholder="IDR">
  //                                 <option>USD</option>
  //                                 <option>SGD</option>
  //                               </Select>
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={3}>
  //                             <FormControl id="nominal">
  //                               <FormLabel>Amount</FormLabel>
  //                               <Input
  //                                 variant="flushed"
  //                                 placeholder="Nominal"
  //                               />
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={2}>
  //                             <FormControl id="curr">
  //                               <FormLabel>Currency</FormLabel>
  //                               <Select variant="flushed" placeholder="USD">
  //                                 <option>IDR</option>
  //                                 <option>SGD</option>
  //                               </Select>
  //                             </FormControl>
  //                           </GridItem>
  //                           <GridItem colSpan={3}>
  //                             <FormControl id="nominal">
  //                               <FormLabel>Amount</FormLabel>
  //                               <Input
  //                                 isDisabled
  //                                 variant="flushed"
  //                                 placeholder="0.00"
  //                               />
  //                             </FormControl>
  //                           </GridItem>
  //                         </Grid>
  //                         <Stack direction="column">
  //                           <Button colorScheme="blue" variant="solid">
  //                             Apply
  //                           </Button>
  //                           <Button colorScheme="blue" variant="ghost">
  //                             Reset
  //                           </Button>
  //                         </Stack>
  //                       </Stack>
  //                     </TabPanel>
  //                   </TabPanels>
  //                 </Tabs>
  //               </Container>
  //             </Box>
  //           </VStack>
  //         </GridItem>
  //       </Grid>
  //     </Box>
  //   </ChakraProvider>
  // );
  // }

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">Simple POST Request</h5>
      <div className="card-body">
        <Text fontSize="3xl">Returned Id: {token}</Text>
        <Text fontSize="3xl">Returned sig: {sig}</Text>
        {rate['Currencies'].map((data, key) => {
          return (
            <div key={key}>
              {data.CurrencyCode +
                ' , ' +
                // {/* {data.RateDetail.map((detail, idx) =>
                //   <div >
                //     <div >{detail.Buy}</div>
                //   </div>)} */
                data.RateDetail[0].Buy}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Kurs;
