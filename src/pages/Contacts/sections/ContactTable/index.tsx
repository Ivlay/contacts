import { useCallback } from 'react';

import { Contact } from 'src/store/components/contacts/types';

import { useAppActions, useAppSelector } from 'src/store/hooks';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import ContactTableHead from './ContactTableHead';
import Avatar from '@mui/material/Avatar';

const ContactTable: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.data);
  const isLoading = useAppSelector((state) => state.contacts.isFetching);
  const totalCount = useAppSelector((state) => state.contacts.total);
  const currentPage = useAppSelector((state) => state.contacts.searchParams._page);

  const { removeContact, updateSearchParams, editContact } = useAppActions();

  const handleRemove = useCallback(
    (id: string) => {
      removeContact(id);
    },
    [removeContact],
  );

  const handleEdit = useCallback(
    (contact: Contact) => {
      editContact(contact);
    },
    [editContact],
  );

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <ContactTableHead />
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={contact.id}
                >
                  <TableCell>
                    <IconButton onClick={handleRemove.bind(null, contact.id)}
                      disabled={isLoading}
                      color="primary"
                    >
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
                        fill="#000"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="DeleteIcon"
                        width={16}
                        height={16}
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </IconButton>
                    <IconButton onClick={handleEdit.bind(null, contact)}
                      disabled={isLoading}
                      color="primary"
                    >
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
                        fill="#000"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="EditIcon"
                        width={16}
                        height={16}
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{contact.age}</TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    {contact.name}
                  </TableCell>
                  <TableCell align="center">{contact.gender}</TableCell>
                  <TableCell align="center">{contact.company}</TableCell>
                  <TableCell align="center">{contact.email}</TableCell>
                  <TableCell align="center" padding="checkbox">
                    <Avatar src={contact.photo} alt={contact.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={Number(totalCount)}
          page={currentPage - 1}
          rowsPerPage={contacts.length < 10 ? 10 : contacts.length}
          rowsPerPageOptions={[]}
          onPageChange={(e, newPage) => updateSearchParams({ _page: newPage + 1 })}
        />
      </Paper>
    </Box>
  )
};

export default ContactTable;
