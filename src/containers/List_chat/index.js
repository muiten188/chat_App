import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  Container,
  Text,
  Button,
  Content,
  Body,
  Thumbnail,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as listChatAction from "../../store/actions/containers/listChat_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import HeaderContent from '../../components/Header_content';
import ItemChat from '../../components/Item_chat';

const blockAction = false;
const blockLoadMoreAction = false;
import { proxy, connection } from '../../helper/signalr';
import * as helper from '../../helper';
import * as helperSignal from '../../helper/signalr';
class ListChat extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      isLocalLoading: true
    }

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentDidMount() {
    if (this.props.loginReducer.user != null) {
      helperSignal.connectSignalr(this.props.loginReducer.user);
      this.onEventSignal();
    }
    else {
      helper.getAsyncStorage("@user", this.onConnectSignal.bind(this));
    }

  }

  onEventSignal() {
    var self = this;
    if (!proxy) {
      return;
    }
    proxy.on('allUser', (users) => {
      console.log('List Users: ', users);
      self.setState({
        listUsers: users,
        isLocalLoading: false
      });
    })
    proxy.on('connect', (id, username, fullname, userID) => {
      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var item = listUsers[i];
        if (item.ID == userID) {
          item.Connected = true;
          break;
        }
      }
      self.setState({
        listUsers: listUsers,
      });
    })
    proxy.on('disConnect', (username, fullname, userID) => {
      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var item = listUsers[i];
        if (item.ID == userID) {
          item.Connected = false;
          break;
        }
      }
      self.setState({
        listUsers: listUsers,
      });
    })
    proxy.on('allMessageUser', (users, count) => {

      var listUsers = self.state.listUsers;
      for (var i = 0; i < self.state.listUsers.length; i++) {
        var oUser = listUsers[i];
        for (var j = 0; j < users.length; j++) {
          var itemY = users[j];
          if (oUser.ID == itemY.ID) {
            listUsers[i].CountNew = itemY.CountNew;
          }
        }
      }
      self.setState({
        listUsers: listUsers,
      });
    })
    proxy.on('devCountMessagePrivate', (userId, count) => {
      if (count > 0) {
        var listUsers = self.state.listUsers;
        for (var i = 0; i < self.state.listUsers.length; i++) {
          var oUser = listUsers[i];
          if (oUser.ID == userId) {
            listUsers[i].CountNew = 0;
            break;
          }
        }
        self.setState({
          listUsers: listUsers,
        });
      }
    })
  }

  onConnectSignal(promise) {
    promise.then((value) => {
      var user = JSON.parse(value);
      if (connection && connection.state != 4) {
        proxy.invoke("loadAllContact");
        proxy.invoke("GetAllMessageUser");

      } else {
        helperSignal.connectSignalr(user);
      }
      this.onEventSignal();
      this.props.loginReducer.user = user;
    }).catch((e) => {
      console.log("get cache failed!".e);
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <Loading isShow={this.state.isLocalLoading} />
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.listResult}
          data={this.state.listUsers}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          numColumns={1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > 0) {
              // // this.onEndReachedCalledDuringMomentum = true;
              // if (
              //     !blockLoadMoreAction &&
              //     !(listResult.length < pageSize)
              // ) {

              //     blockLoadMoreAction = true;
              //     this.smallLoading.show(),
              //         setTimeout(() => {
              //             searchAction.loadMore(
              //                 valuesForm,
              //                 currentPage,
              //                 pageSize,
              //                 user
              //             )
              //         }, 0);

              //     setTimeout(() => {
              //         if (loadEnd != true) {
              //             blockLoadMoreAction = false;
              //         }
              //     }, 700);
              // }
            }
          }}
          onEndReachedThreshold={0.7}
        />
      </Container>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_container_half
        }
        onPress={() => {
          // if (!blockAction) {
          //     blockAction = true;
          Actions.chatScreen({ user: item });
          // }
        }}
      >
        <ItemChat data={item}></ItemChat>

      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

}
function mapStateToProps(state, props) {
  return {
    listChatReducer: state.listChatReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    listChatAction: bindActionCreators(listChatAction, dispatch)
  };
}

ListChat = connect(mapStateToProps, mapToDispatch)(ListChat);
export default ListChat;
