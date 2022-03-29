import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Controller, useForm } from 'react-hook-form';

import { INPUTS_CONTACT } from '../../constants';

import { Contact } from 'src/store/components/contacts/types';

import { useAppSelector, useAppActions } from 'src/store/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const TIMEOUT = {
  enter: 500,
};

const AddContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = useAppSelector((state) => state.contacts.isFetching);
  const editValue = useAppSelector((state) => state.contacts.editValue);

  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const { addContact, editContactReset, editContactSend } = useAppActions();

  const defaultValues = useMemo(
    () => ({ ...editValue }),
    [editValue],
  );

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<Contact>({
    defaultValues,
  });

  useEffect(
    () => {
      let timer: NodeJS.Timeout | null = null;

      if (isOpen) {
        timer = setTimeout(
          () => {
            if (buttonContainerRef.current) {
              buttonContainerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            };
          },
          TIMEOUT.enter,
        );
      };

      return () => {
        if (timer) {
          clearTimeout(timer);
        };
      }
    },
    [isOpen],
  );

  useEffect(
    () => {
      if (editValue) {
        setIsOpen(true);
      };

      if (defaultValues) {
        reset(defaultValues);
      }
    },
    [defaultValues, editValue, reset],
  );

  const handleOpenCollapse = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;

    if (defaultValues) {
      editContactReset();
      reset(defaultValues);
    };

    if (name === 'open') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    };

  };

  const onSubmit = useCallback(
    (values) => {
      if (editValue) {
        editContactSend(values);
        setIsOpen(false);
      } else {
        addContact({ id: String(Date.now()), ...values });
      }

      reset();
    },
    [
      editValue,
      editContactSend,
      addContact,
      reset,
    ],
  );

  return (
    <Box width="100%">
      <Fade
        in={!isOpen}
        unmountOnExit
        exit={false}
        timeout={TIMEOUT}
      >
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            name="open"
            onClick={handleOpenCollapse}
          >
            add contact
          </Button>
        </Box>
      </Fade>
      <Collapse
        in={isOpen}
        unmountOnExit
        exit={false}
        timeout={TIMEOUT}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              gap="15px"
              mb="20px"
            >
              {INPUTS_CONTACT.map((input) => (
                <Controller
                  defaultValue=""
                  key={input.name}
                  name={input.name}
                  rules={input.rules}
                  control={control}
                  render={({ field, formState }) => input.options ? (
                    <Select
                      {...field}
                      displayEmpty
                      error={Boolean(formState.errors[input.name])}
                      placeholder={input.placeholder}
                    >
                      <MenuItem disabled value="">
                        {input.placeholder}
                      </MenuItem>
                      {input.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <TextField
                      {...field}
                      placeholder={input.placeholder}
                      type={input.type}
                      disabled={isLoading}
                      helperText={formState.errors[input.name]?.message}
                      error={Boolean(formState.errors[input.name])}
                    />
                  )}
                />
              ))}
            </Box>
            <Box display="flex" gap="40px" justifyContent="center" ref={buttonContainerRef}>
              <Button name="cancel" onClick={handleOpenCollapse}>
                cancel
              </Button>
              <Button variant="contained" type="submit">
                submit
              </Button>
            </Box>
          </form>
        </div>
      </Collapse>
    </Box>
  );
};

export default AddContactForm;
