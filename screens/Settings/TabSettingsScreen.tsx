import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import EditScreenInfo from '../../components/EditScreenInfo';
import { View, Text, Button, TextInput } from '../../components/Themed';
import { setApiUri } from '../../redux/Settings/Settings_actions';

export default function TabSettingsScreen() {
  const [apiUri, setApiConnection] = React.useState('https://1234565576.ngrok.io/api');
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text
        style={styles.apiLabel}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Type your API URI
      </Text>
      <TextInput
        style={styles.apiInput}
        editable
        value={apiUri}
        onChangeText={text => setApiConnection(text)}

      />
      <Button
        title='Submit'
        onPress={() => dispatch(setApiUri(apiUri))}
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
  },
  apiInput: {
    paddingLeft: 10,
    height: 40,
    width: 250,
    borderWidth: 1
  },
  submitButton: {
    margin: 10,
    width: 100,
    height: 30,
    borderWidth: 1
  }
});
