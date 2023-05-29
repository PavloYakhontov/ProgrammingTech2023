import { Text, View } from 'react-native';
import React from 'react';

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    return (
      <View>
        <Text>ErrorBoundary</Text>
      </View>
    );
  }
}
