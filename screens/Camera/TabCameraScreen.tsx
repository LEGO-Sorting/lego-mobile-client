import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js'

import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../../components/Themed';
import Axios from 'axios';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [focusedScreen, setFocusedScreen] = useState(true);
  const navigation = useNavigation()

  const [isRecording, setIsRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null)
  const [base64Video, setBase64Video] = useState('')

  const stringToUint8Array = (str: any) => {
    const length = str.length
    const array = new Uint8Array(new ArrayBuffer(length))
    for (let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
    return array
  }

  // const fileToBase64 = async (uri: any) => {
  //   const content = FileSystem.readAsStringAsync(uri.toString())
  //   .then()
  //   console.log(`Content`, content)
  //   return base64.fromByteArray(stringToUint8Array(content))
  // }

  const fileToBase64 = async (uri: any) => {
    let result = '';
    try {
        result = await FileSystem.readAsStringAsync(uri);
        console.log('result', result)
    } catch(e) {
        console.log(e);
    }
    return base64.fromByteArray(stringToUint8Array(result));
  }

  const uploadVideo = (localUri: string) => {

  }


  const handleRecord = async() => {
    if(!isRecording){
      setIsRecording(true)
      let video = await cameraRef.recordAsync({
        quality: Camera.Constants.VideoQuality['480p'],
        mute: true
      });
      console.log('video', video);
      const result = await FileSystem.uploadAsync(
        'https://8f51146e9d2c.ngrok.io/api/upload/files',
        video.uri, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
          mimeType: 'video/mp4'
        })

      console.log(result.body.imageId);
      Axios.post('https://8f51146e9d2c.ngrok.io/api/process',{'imageName': result.body.imageId})

      console.log(result)

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
