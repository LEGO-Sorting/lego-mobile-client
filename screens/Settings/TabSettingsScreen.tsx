import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View, Text, TextInput } from '../../components/Themed';

export default function TabSettingsScreen() {
  const [apiUri, setApiUri] = React.useState('https://1234565576.ngrok.io/api');
  return (
    <View style={styles.container}>
        <Text
          style={styles.apiLabel}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Type your API URI
        </Text>
      <TextInput
        style={styles.apiInput}
        editable
        value={apiUri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apiLabel: {
    margin: 10,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  apiInput: {
    paddingLeft: 10,
    height: 40,
    width: 250,
    borderWidth: 1
  }
});
