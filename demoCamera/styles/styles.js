import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
