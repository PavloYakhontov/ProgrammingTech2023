import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { useCallback, useRef, useState } from 'react';
import { Boundary } from '@core/http/Boundary';
import { globalActions } from '@redux/slices/global.slice';
import { RootState } from '@redux/store/store';
import { Arguments } from '@type/ts_extension';
import { queueMicrotask } from '@utils/helpers';

export const useSafeHTTP = (getStorage: ((state: RootState) => RootState) | null = null) => {
  const [{ loading, error }, setState] = useState<{loading: boolean, error: boolean}>({
    error: false,
    loading: false,
  });
  const dispatch = useTypedDispatch();
  const prevValue = useRef<any>(null);
  const state = useTypedSelector(getStorage || ((state) => state));

  const httpCaller = useCallback(async <T extends (args: any) => any>(method: T, args: Arguments<T>): Promise<Exclude<Awaited<ReturnType<T> | null>, Boundary>> => {
    if (getStorage === null) {
      setState((prev) => ({ ...prev, loading: true }));
      const response: ReturnType<T> | Boundary = await method(args);
      if (!response) {
        setState((prev) => ({ ...prev, loading: false, error: false }));
      }
      if (response instanceof Boundary) {
        setState((prev) => ({ ...prev, loading: false, error: true }));
        dispatch(globalActions.openFatalModal({ show: true, boundary: response }));
        return null;
      }
      prevValue.current = response;
      setState((prev) => ({ ...prev, loading: false, error: response?.status > 204 }));
      return response?.status > 204 ? null : response;
    }
    queueMicrotask(() => {
      dispatch(method(args));
    }).then();
    return null;
  }, [dispatch, getStorage]);

  return { prevValue, state, httpCaller, error, loading };
};
