import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
import Button from '../components/Button';
import styles from '../styles/styles';

const CameraComponent = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'front',
    flash: 'on',
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === 'granted'
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return <View />;
  }

  if (!cameraPermission.granted || mediaLibraryPermissionResponse.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1),
    }));
  };

  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0),
    }));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log('Error while taking the picture:', err);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        Alert.alert('Photo saved!'); //remouved showing img path
        setImage(null);
        getLastSavedImage();
      } catch (err) {
        console.log('Error while saving the picture:', err);
      }
    }
  };

  const getLastSavedImage = async () => {
    if (mediaLibraryPermissionResponse?.status === 'granted') {
      const dcimAlbum = await MediaLibrary.getAlbumAsync('DCIM');

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <Button icon={cameraProps.flash === 'on' ? 'flash-on' : 'flash-off'} onPress={() => toggleProperty('flash', 'on', 'off')} />
            <Button icon="animation" color={cameraProps.animateShutter ? 'white' : '#404040'} onPress={() => toggleProperty('animateShutter', true, false)} />
            <Button icon={cameraProps.enableTorch ? 'flashlight-on' : 'flashlight-off'} onPress={() => toggleProperty('enableTorch', true, false)} />
          </View>
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
          <View style={styles.sliderContainer}>
            <Button icon="zoom-out" onPress={zoomOut} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={cameraProps.zoom}
              onValueChange={(value) => setCameraProps((current) => ({ ...current, zoom: value }))}
              step={0.1}
            />
            <Button icon="zoom-in" onPress={zoomIn} />
          </View>
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity onPress={() => previousImage && setImage(previousImage)}>
              <Image source={{ uri: previousImage }} style={styles.previousImage} />
            </TouchableOpacity>
            <Button icon="camera" size={80} style={{ height: 80 , right: 10, bottom: 10}} onPress={takePicture} />
            <Button icon="flip-camera-ios" style={{ bottom: 10}} onPress={() => toggleProperty('facing', 'front', 'back')} size={40} />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <Button icon="flip-camera-android" onPress={() => setImage(null)} />
            <Button icon="check" onPress={savePicture} />
          </View>
        </>
      )}
    </View>
  );
};

export default CameraComponent;
