import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosAdapter from 'src/api';

import { CONTACTS } from 'src/constants/routes';
import { TOKEN_KEY } from 'src/constants';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonLoader from 'src/components/UI/ButtonLoader';

type User = Record<'email' | 'password' | 'lastname' | 'firstname' | 'jwt_token' | 'id', string>;

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const navigate = useNavigate();

  const updateLoading = () => setIsLoading((prevState) => !prevState);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isLoading) {
        try {
          updateLoading();
          setResponseError('');

          const { data } = await axiosAdapter.get<User[]>('/api/users', {
            params: inputs,
          });

          
          if (!data.length) {
            throw Error('User not found');
          }

          updateLoading();

          navigate(CONTACTS, { state: {
            jwt_token: data[0].jwt_token
          } });
          localStorage.setItem(TOKEN_KEY, data[0].jwt_token)
        } catch (error) {
          const err = error as { message: string };
          updateLoading();
          setResponseError(err.message);
        }
      };
    },
    [
      isLoading,
      inputs,
      navigate,
    ],
  );

  const updateInputs = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setInputs],
  );

  return (
    <Box display="flex" justifyContent="center">
      <Box
        width="100%"
        component="form"
        display="flex"
        flexDirection="column"
        maxWidth={500}
        gap={4}
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={inputs.email}
          error={Boolean(responseError)}
          disabled={isLoading}
          helperText={responseError}
          onChange={updateInputs}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          error={Boolean(responseError)}
          helperText={responseError}
          disabled={isLoading}
          value={inputs.password}
          onChange={updateInputs}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          login
          <ButtonLoader isLoading={isLoading} />
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
