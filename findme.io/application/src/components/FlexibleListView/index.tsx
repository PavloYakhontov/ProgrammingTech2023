import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useFocus } from '@reacts/hooks/useNavigations';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { Styles } from '@styles/load';
import { Unpacked } from '@type/ts_extension';

type flexibleListViewProps<T> = {
  isLoading: boolean;
  horizontal?: boolean;
  pagingEnabled?: boolean;
  wrapped?: boolean;
  empty: JSX.Element;
  loader: JSX.Element;
  items: flexibleListViewProps<T>['request'] extends object ? void : Array<T>;
  // unrealized dreams :(
  request?: {
    requestFunc: (args: any) => any;
    requestBody?: object;
  };
  loadOnFocus?: boolean;
  scrollStyles?: {};
  contentContainerStyles?: {};
  keyExtractor(
    item: Unpacked<flexibleListViewProps<T>['items']>,
    index: number,
  ): string;
  renderItem(
    item: Unpacked<flexibleListViewProps<T>['items']>,
    index: number,
  ): JSX.Element;
};

type flexibleListViewState<T = any> = {
    items: Array<T>;
}

const FlexibleListView = <T = any>({
  keyExtractor,
  contentContainerStyles,
  empty,
  loader,
  isLoading,
  horizontal,
  items,
  loadOnFocus,
  pagingEnabled,
  renderItem,
  request,
  scrollStyles,
  wrapped,
}: flexibleListViewProps<T>) => {
  const { httpCaller, loading } = useSafeHTTP();
  const [getState, setState] = useState<flexibleListViewState<T>>({
    items: [],
  });

  useFocus(async () => {
    if (loadOnFocus && request) {
      const { requestBody, requestFunc } = request;
      const response = await httpCaller(requestFunc, requestBody);
      if (response && response?.data) {
        setState((prev) => ({ ...prev, items: response.data }));
      }
    }
  }, []);

  if (!items && !getState.items) {
    return empty;
  }

  const isLoaded = request !== void 0 ? isLoading : loading;
  const listItems = request !== void 0 ? getState.items : items;

  const renderListWithKey = (el: any, index: number) => {
    const key = keyExtractor(el, index);
    return (
      <React.Fragment key={key}>
        {renderItem(el, index)}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {isLoaded ?
        loader : (
          <ScrollView
            style={scrollStyles}
            pagingEnabled={pagingEnabled}
            contentContainerStyle={[contentContainerStyles, wrapped ? [Styles.Layout.wrap, Styles.Layout.max_w_100pc] : {}]}
            horizontal={horizontal}
          >
            {
                listItems?.map(renderListWithKey)
            }
          </ScrollView>
        )}
    </React.Fragment>
  );
};

export { FlexibleListView };
