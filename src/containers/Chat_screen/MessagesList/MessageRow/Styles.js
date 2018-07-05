import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 5
  },
  bubbleView_me: {
    backgroundColor: '#1E90FF',
    flex: 1,
    borderRadius: 8,
    padding:8
  },
  bubbleView_friend: {
    backgroundColor: '#cccc',
    flex: 1,
    borderRadius: 8,
    padding:8
  },
  userText_me: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  userText_friend: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'
  },
  messageText_me: {
    flex: 1,
    color: 'white',
    fontSize: 16
  },
  messageText_friend: {
    flex: 1,
    color: 'black',
    fontSize: 16
  }
})
