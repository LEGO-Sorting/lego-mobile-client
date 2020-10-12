import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [focusedScreen, setFocusedScreen] = useState(true);
  const navigation = useNavigation()

  const [isRecording, setIsRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null)

  const handleRecord = async() => {
    if(!isRecording){
      setIsRecording(true)
      let video = await cameraRef.recordAsync();
      console.log('video', video);
    } else {
      setIsRecording(false)
      cameraRef.stopRecording()
    }
  }

  useEffect(() =>{
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      let cameraResponse = await Permissions.askAsync(Permissions.CAMERA)
      if (cameraResponse.status == 'granted') {
        let audioResponse = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (audioResponse.status == 'granted') {
          setHasPermission(true)
      }
    }
    })();

    navigation.addListener('focus', () =>
      setFocusedScreen(true)
    );
    navigation.addListener('blur', () =>
      setFocusedScreen(false)
    );
  })

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if(!focusedScreen) {
    return(
      <View/>
    )
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{flex: 1}}
        ref={ref => setCameraRef(ref)}
      >
        <View
          style={styles.cameraView}>
          <TouchableOpacity
            style={styles.buttonsBar}
            onPress={async() => await handleRecord()}
          >
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
      </Camera>
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
