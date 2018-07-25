import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#eeeeee'
  },
  button: {
    flexShrink: 0,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:8,
    marginLeft:4
  },
  disconnectSignalr: {
    zIndex:9999,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height: 25,
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center'
  },
  connectingSignalr:{
    zIndex:9999,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height: 25,
    backgroundColor: '#28a745',
    alignItems:'center',
    justifyContent:'center'
  },
})
