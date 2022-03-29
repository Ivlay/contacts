import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { call } from 'redux-saga/effects';

import axiosAdapter from 'src/api';

type TCallEffect = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

const callAxios = (config: AxiosRequestConfig) => call<TCallEffect>(axiosAdapter, config);

export default callAxios;
