import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Text, View } from '../../components/Themed';
import PhoneCamera from './PhoneCamera';

export default function CameraScreen() {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord


  return (
    <View style={styles.container}>
      <PhoneCamera>
        <View
          style={styles.cameraView}>
          <TouchableOpacity
            style={styles.buttonsBar}
            onPress={() => setIsRecording(!isRecording)}>
            {!isRecording
              ? <View style={styles.startButtonBorder}>
                  <View style={styles.startButtonInside} ></View>
                </View>
              : <View style={styles.stopButtonBorder}>
                  <View style={styles.stopButtonInside} ></View>
                </View>
              
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
  startButtonBorder: { 
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width:50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'},
  startButtonInside: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 40,
    width:40,
    backgroundColor: 'white'
  },
  stopButtonInside: {
    borderWidth: 2,
    borderRadius:50,
    borderColor: 'red',
    height: 40,
    width:40,
    backgroundColor: 'red'
  },
  stopButtonBorder: { 
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'red',
    height: 50,
    width:50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
