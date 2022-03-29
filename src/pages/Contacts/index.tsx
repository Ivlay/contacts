import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { LOGIN } from 'src/constants/routes';
import { TOKEN_KEY } from 'src/constants'

import { useAppActions, useAppSelector } from 'src/store/hooks';

import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import ContactTable from 'src/pages/Contacts/sections/ContactTable';
import TextField from '@mui/material/TextField';
import AddContactForm from './sections/AddContactForm';

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();

  const searchParams = useAppSelector((state) => state.contacts.searchParams);

  const { getContacts, updateSearchValue } = useAppActions();

  const { control, watch } = useForm({
    defaultValues: {
      searchValue: '',
    },
  });

  const searchValue = watch('searchValue');

  useEffect(
    () => {
      if (localStorage.getItem(TOKEN_KEY)) {
        getContacts();
      } else { 
        navigate(LOGIN, { replace: true });
      }
    },
    [navigate, searchParams],
  );

  useEffect(
    () => {
      updateSearchValue(searchValue);
    },
    [searchValue],
  );

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Fade in timeout={500}>
          <div>
            <Controller
              name="searchValue"
              control={control}
              render={({ field }) => (
                <TextField {...field} placeholder="Search" />
              )}
            />
          </div>
        </Fade>
      </Box>
      <ContactTable />
      <Box
        display="flex"
        justifyContent="center"
        margin="24px auto 0"
        maxWidth="500px"
        width="100%"
      >
        <AddContactForm />
      </Box>
    </Box>
  );
};

export default ContactsPage