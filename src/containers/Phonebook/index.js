import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl
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
import * as phoneBookAction from "../../store/actions/containers/phoneBook_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import HeaderContent from '../../components/Header_content';
import ItemPhoneBook from '../../components/Item_phoneBook';

var EventEmitter = require('EventEmitter');

const blockAction = false;
const blockLoadMoreAction = false;
import { proxy, connection } from '../../helper/signalr';
import * as helper from '../../helper';
import * as helperSignal from '../../helper/signalr';
import fcmClient from '../../helper/fcmClient';
class PhoneBook extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      listGroups: [],
      _listUsers: null,
      _listGroups: null,
      isLocalLoading: true
    }

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentWillMount() {
  
  }

  componentDidMount() {
    if (connection && connection.state == 1) {
      this.onEventSignal();
      try {
        proxy.invoke("loadAllContact");
      }
      catch (e) {

      }
      return;
    }
    if (this.props.loginReducer.user != null) {
      helperSignal.connectSignalr(this.props.loginReducer.user);
      this.onEventSignal();
      // if (connection && connection.state == 1) {
      //   proxy.invoke('loadAllGroup');
      // } else {
      //   helperSignal.onReconnect(() => {
      //     proxy.invoke('loadAllGroup');
      //   });
      // }

    }
    else {
      helper.getAsyncStorage("@user", this.onConnectSignal.bind(this));
    }

  }
  componentWillUnmount() {
    try {
      proxy.off('allUser');
    }
    catch (e) {
      //error
    }
  }

  onEventSignal() {
    var self = this;
    if (!proxy) {
      return;
    }
    //user
    proxy.on('allUser', (users) => {
      console.log('List Users: ', users);
      if (this.state.listUsers && this.state.listUsers.length > 0) {
        for (var j = 0; j < this.state.listUsers.length; j++) {
          var oldUser = this.state.listUsers[j];
          for (var i = 0; i < users.length; i++) {
            var oUser = users[i];
            if (oUser.ID == oldUser.ID) {
              users[i].CountNew = oldUser.CountNew;
              break;
            }
          }
        }
      }
      self.setState({
        listUsers: users,
        isLocalLoading: false
      });

    })
  }

  onConnectSignal(promise) {
    promise.then((value) => {
      var user = JSON.parse(value);
      if (connection && connection.state == 1) {
        proxy.invoke("loadAllContact");

      } else {
        helperSignal.onReconnect(() => {
          proxy.invoke("loadAllContact");
        });
        //helperSignal.connectSignalr(user);
      }
      this.onEventSignal();
      this.props.loginReducer.user = user;
    }).catch((e) => {
      console.log("get cache failed!".e);
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }

  filterSearch(value) {
    let { listUsers, listGroups } = this.state;
    if (value != '') {
      var _listUsers = listUsers.filter(user => user.FullName.toLowerCase().indexOf(value.toLowerCase()) != -1)
      var _listGroups = listGroups.filter(group => group.Name.toLowerCase().indexOf(value.toLowerCase()) != -1)
      this.setState({
        _listUsers: _listUsers,
        _listGroups: _listGroups
      })
    }
    else {
      this.setState({
        _listUsers: null,
        _listGroups: null
      })
    }
  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <Loading isShow={this.state.isLocalLoading} />
        <Item style={{ marginTop: 4, marginLeft: 6, marginRight: 6, height: 40, width: '97%' }} rounded>
          <Icon name="search" style={{ paddingLeft: 10 }} size={18}></Icon>
          <Input
            height={40}
            style={{
              textAlign: 'center',
              marginLeft: -15
            }}
            placeholder={"Tìm kiếm"}
            value={this.state.groupNameSearch}
            onChangeText={(value) => {
              this.setState({ groupNameSearch: value });
              this.filterSearch(value);
            }}></Input>
        </Item>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={this.state.isLocalLoading}
              onRefresh={() => {
                if (connection && connection.state == 1) {
                  proxy.invoke("loadAllContact");

                } else {
                  helperSignal.onReconnect(() => {
                    proxy.invoke("loadAllContact");
                  });
                  //helperSignal.connectSignalr(user);
                }
              }}
            />
          }
          style={styles.listResult}
          data={(this.state._listGroups != null || this.state._listUsers != null) ? [...this.state._listGroups, ...this.state._listUsers] : [...this.state.listGroups, ...this.state.listUsers]}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderFlatListItem.bind(this)}
          numColumns={1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={({ distanceFromEnd }) => {

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
          if (!item.Name) {
            Actions.chatScreen({ user: item });
          }
          else {
            Actions.chatScreen({ user: this.props.loginReducer.user, group: item, isGroupChat: true });
          }
        }}
      >
         <ItemPhoneBook data={item}></ItemPhoneBook>
      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

}
function mapStateToProps(state, props) {
  return {
    phoneBookReducer: state.phoneBookReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    phoneBookAction: bindActionCreators(phoneBookAction, dispatch)
  };
}

PhoneBook = connect(mapStateToProps, mapToDispatch)(PhoneBook);
export default PhoneBook;
