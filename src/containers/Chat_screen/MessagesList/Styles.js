import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  placeholder: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  disconnectSignalr: {
    width: '100%',
    height: 25,
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center'
  },
  connectingSignalr:{
    width: '100%',
    height: 25,
    backgroundColor: '#28a745',
    alignItems:'center',
    justifyContent:'center'
  },
})
