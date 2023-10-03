import React from 'react';
import { useTable } from 'react-table';
import { Box, Text, Flex } from 'theme-ui';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const CartTable = ({
  cartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  handleRemoveFromCart,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <img
              src={row.original.images[0].src}
              alt={row.original.name}
              style={{ maxWidth: '80px' }}
            />
          </Box>
        ),
      },
      {
        Header: 'Product',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Text>{row.original.quantity}</Text>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  padding: '10px',
                  background: '#cbd5e0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mr: 2,
                }}
              >
                <FaPlus
                  color="#fff"
                  onClick={() => increaseCartQuantity(row.original.id)}
                />
              </Box>
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  padding: '10px',
                  background: '#cbd5e0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <FaMinus
                  color="#fff"
                  onClick={() => decreaseCartQuantity(row.original.id)}
                />
              </Box>
            </Flex>
          </Box>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Flex sx={{ justifyContent: 'center' }}>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                padding: '10px',
                background: '#bf002e',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <FaTimes
                color="#fff"
                onClick={() => handleRemoveFromCart(row.original.id)}
              />
            </Box>
          </Flex>
        ),
      },
    ],
    [],
  );

  const data = React.useMemo(() => cartItems, [cartItems]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Box
      sx={{
        alignItems: `stretch`,
        overflowX: `auto`,
        height: `60vh`,
        maxHeight: `750px`,
        flexWrap: 'wrap',
        flexBasis: '70%',
      }}
    >
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
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
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      <Text
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        {cell.render('Cell')}
                      </Text>
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

export default CartTable;
