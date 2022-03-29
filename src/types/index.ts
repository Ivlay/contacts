import { RegisterOptions } from 'react-hook-form';

export interface Input<T = string> {
  name: T,
  placeholder: string;
  type: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  options?: string[];
}
