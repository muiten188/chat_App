import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import { proxy } from '../../../helper/signalr';
// const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages')
// const FIREBASE_REF_MESSAGES_LIMIT = 20

export const sendMessage = (message, user) => {
    return (dispatch) => {
        dispatch(chatMessageLoading())
        proxy.invoke('addMessagePrivate', user.ID, message).done(() => {
            dispatch(chatMessageSuccess(message));
        })
        //let currentUser = firebaseService.auth().currentUser
        // let createdAt = new Date().getTime()
        // let chatMessage = {
        //     text: message,
        //     createdAt: createdAt,
        //     user: {
        //         id: 1,//currentUser.uid,
        //         email: 'email@gmail.com'//currentUser.email
        //     }
        // }
        // dispatch(chatMessageSuccess(message))
        // // FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
        // //   if (error) {
        // //     dispatch(chatMessageError(error.message))
        // //   } else {
        // //     dispatch(chatMessageSuccess())
        // //   }
        // // })
    }
}

export const updateMessage = text => {
    return (dispatch) => {
        dispatch(chatUpdateMessage(text))
    }
}

export const loadMessages = () => {
    return (dispatch) => {
        FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
            dispatch(loadMessagesSuccess(snapshot.val()))
        }, (errorObject) => {
            dispatch(loadMessagesError(errorObject.message))
        })
    }
}

const chatMessageLoading = () => ({
    type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = (message) => ({
    type: types.CHAT_MESSAGE_SUCCESS,
    message: message
})

const chatMessageError = error => ({
    type: types.CHAT_MESSAGE_ERROR,
    error
})

const chatUpdateMessage = text => ({
    type: types.CHAT_MESSAGE_UPDATE,
    text
})

const loadMessagesSuccess = messages => ({
    type: types.CHAT_LOAD_MESSAGES_SUCCESS,
    messages
})

const loadMessagesError = error => ({
    type: types.CHAT_LOAD_MESSAGES_ERROR,
    error
})