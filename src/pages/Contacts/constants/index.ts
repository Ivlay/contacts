import { Input } from 'src/types';

export type InputName = 'age' | 'name' | 'gender' | 'company' | 'email' | 'photo';

export const INPUTS_CONTACT: Input<InputName>[] = [
  {
    name: 'age',
    placeholder: 'Enter age',
    type: 'number',
    rules: {
      required: 'Age is required',
      min: {
        value: 17,
        message: 'Age cannot be less than 17',
      },
      max: {
        value: 100,
        message: 'Age cannot be more than 100',
      },
    },
  },
  {
    name: 'name',
    placeholder: 'Enter name',
    type: 'string',
    rules: {
      required: 'Name is required',
    },
  },
  {
    name: 'gender',
    placeholder: 'Select gender',
    type: 'string',
    rules: {
      required: 'Gender is required',
    },
    options: [
      'male',
      'female',
    ],
  },
  {
    name: 'company',
    placeholder: 'Enter company name',
    type: 'string',
    rules: {
      required: 'Company name is required',
    },
  },
  {
    name: 'email',
    placeholder: 'email',
    type: 'email',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
  },
  {
    name: 'photo',
    placeholder: 'Enter link',
    type: 'url',
  },
];
