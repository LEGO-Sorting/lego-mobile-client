import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Text, View } from '../../components/Themed';
import PhoneCamera from './PhoneCamera';

export default function CameraScreen() {
  const [isRecording, setIsRecording] = useState(false);


  return (
    <View style={styles.container}>
      <PhoneCamera>
        <View
          style={styles.cameraView}>
          <TouchableOpacity
            style={styles.buttonsBar}
            onPress={() => setIsRecording(!isRecording)}>
            {!isRecording
              ? <Text style={styles.startRecording}> Start Recording </Text>
              : <Text style={styles.stopRecording}> Stop Recording </Text>
            }
          </TouchableOpacity>
        </View>
      </PhoneCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  startRecording: { 
    marginBottom: 30,
    padding: 12,
    alignSelf: 'center',
    textAlign:'center',
    borderRadius:100,
    borderWidth: 4,
    borderColor: 'white',
    color: 'white',
    fontSize: 18
  },
  stopRecording: { 
    marginBottom: 30,
    padding: 12,
    alignSelf: 'center',
    textAlign:'center',
    borderRadius:100,
    borderWidth: 4,
    borderColor: 'red',
    color: 'red',
    fontSize: 18
  },
  buttonsBar: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  }
});
