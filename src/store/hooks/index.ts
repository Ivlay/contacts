import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { bindActionCreators } from 'redux';

import rootActionCreators from '../components/actions';
import type { RootState, AppDispatch } from '..';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(rootActionCreators, dispatch);
};
