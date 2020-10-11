import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../../components/Themed';

export default function PhoneCamera(props: { children: any }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [focusedScreen, setFocusedScreen] = useState(true);
  const { children } = props
  const navigation = useNavigation()

  useEffect(() =>{
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
    <Camera style={{ flex: 1 }} >
      {children}
    </Camera>
  )
}