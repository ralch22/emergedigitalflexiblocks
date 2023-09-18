import React from 'react';
import { useTable } from 'react-table';
import { Box, Text, Flex } from 'theme-ui';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa'
import { formatDate } from '../../../../themes/gatsby-theme-flexiblocks/src/utils/tools';

const SubsTable = ({ subs }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
            <Text>{formatDate(row.original.date_created_gmt)}</Text>
          </Box>
        ),
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
            <Text>${row.original.total}</Text>
          </Box>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Start Date',
        accessor: 'start_date_gmt',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
            <Text>{formatDate(row.original.start_date_gmt)}</Text>
          </Box>
        ),
      },
      {
        Header: 'End Date',
        accessor: 'end_date_gmt',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
            <Text>{row.original.end_date_gmt !== "" ? formatDate(row.original.end_date_gmt) : ''}</Text>
          </Box>
        ),
      },
      {
        Header: 'Next Billing Date',
        accessor: 'next_payment_date_gmt',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
            <Text>{formatDate(row.original.next_payment_date_gmt)}</Text>
          </Box>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => subs, [subs]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Box  
    sx={{
        alignItems: `stretch`,
        overflowX: `auto`,
        width: '100%',
        height: `100%`,
        flexWrap: "wrap",
        flexBasis: "70%"
      }}
      >
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <Text sx={{ variant: 'text.tableHeader' }}>
                    {column.render('Header')}
                  </Text>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      <Text  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>{cell.render('Cell')}</Text>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default SubsTable;
