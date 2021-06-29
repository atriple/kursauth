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

export default function KursEcb({ response }) {
  //   const [error, setError] = useState(null);
  //   const [isLoading, setLoading] = useState(true);
  //   const [token, setToken] = useState('');

  const math = require('mathjs');
  const data = React.useMemo(
    () =>
      Object.keys(response).map((key, index) => ({
        currency: key,
        buy: math.round(1 / response[key], 2),
      })),
    [response]
  );

  //   const columns = React.useMemo(
  //     () => [
  //       {
  //         Header: 'Currency',
  //         accessor: 'currency',
  //       },
  //       {
  //         Header: 'Buy',
  //         accessor: 'buy',
  //       },
  //       {
  //         Header: 'Sell',
  //         accessor: 'sell',
  //       },
  //     ],
  //     []
  //   );
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
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
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}