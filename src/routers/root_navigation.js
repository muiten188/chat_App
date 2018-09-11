import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
//list screen
import Login from '../authen/containers/Login';
import Register from '../authen/containers/Register';
import Home from '../containers/Home';
import ChatSreen from '../containers/Chat_screen';
import Profile from '../containers/Profile';
import ListChat from '../containers/List_chat';
import Phonebook from '../containers/Phonebook';
import ListGroup from "../containers/List_group";
import GroupEdit from "../containers/Group_edit";
import ChatEdit from '../containers/Chat_edit';
import ChangePassword from "../containers/ChangePassword";
import PropTypes from 'prop-types';

class RootNavigation extends React.Component {
    //Life cycle component
    constructor(props) {
        super(props);
        this._handleBackAction = this.handleBackAction.bind(this);
    }

    componentDidMount() {
        if (Platform.OS == "android") {
            BackHandler.addEventListener('backPress', this._handleBackAction);
        }
    }

    componentWillUnmount() {
        if (Platform.OS == "android") {
            BackHandler.removeEventListener('backPress', this._handleBackAction);
        }
    }
    //component function
    handleBackAction() {
        if (Platform.OS == "android") {
            ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        }
        //pop
    }

    render() {
        return (
            <Router>
                <Stack key="root_authen">
                    <Scene key="login"
                        component={Login}
                        title="Login"
                        initial={true}
                    />
                    <Scene
                        key="register"
                        component={Register}
                        title="Register"
                    />
                    <Scene key="home"
                        component={Home}
                        title="Home"
                        initial={false}
                    />
                    <Scene key="listChat"
                        component={ListChat}
                        title="List Chat"
                        initial={false}
                    />
                    <Scene key="listGroup"
                        component={ListGroup}
                        title="List Group"
                        initial={false}
                    />
                    <Scene key="chatEdit"
                        component={ChatEdit}
                        title="chat Edit"
                        initial={false}
                    />
                    <Scene key="groupEdit"
                        component={GroupEdit}
                        title="Group Edit"
                        initial={false}
                    />
                    <Scene key="chatScreen"
                        component={ChatSreen}
                        title="Trò chuyện"
                        initial={false}
                    />
                    <Scene key="museum"
                        component={ChatSreen}
                        title="Museum"
                        initial={false}
                    />
                    <Scene key="profile"
                        component={Profile}
                        title="Profile"
                        initial={false}
                    />
                    <Scene key="changePassword"
                        component={ChangePassword}
                        title="Change Password"
                        initial={false}
                    />
                    <Scene key="Phonebook"
                        component={Phonebook}
                        title="Phonebook"
                        initial={false}
                    />
                </Stack>
            </Router>
        );
    }
}
RootNavigation.propTypes = {

}

function mapStateToProps(state, props) {
    return {
        //navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        //navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(RootNavigation);