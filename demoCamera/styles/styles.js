import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  topControlsContainer: {
    height: 80,
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
    bottom: 160,
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  bottomControlsContainer: {
    height: 150,
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
  containerDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color for the dashboard
    padding: 20,
  },
  buttonCaM: {
    position: 'absolute', // Position the button absolutely
    bottom: 50, // Space from the bottom of the screen
    width: 80, // Set a fixed width for the button
    height: 80, // Set a fixed height to make it round
    backgroundColor: '#007BFF', // Blue background color for the button
    borderRadius: 40, // Border radius to make the button round
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    elevation: 5,
  },
});
