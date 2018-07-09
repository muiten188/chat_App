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
import { proxy,connection } from '../../helper/signalr';
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
      proxy.on('allUser', (users) => {
        console.log('List Users: ', users);
        this.setState({
          listUsers: users,
          isLocalLoading: false
        });
      })
    }
    else {
      helper.getAsyncStorage("@user", this.onConnectSignal.bind(this));
    }

  }

  onConnectSignal(promise) {
    promise.done((value) => {
      var user = JSON.parse(value);
      if(proxy){
        connection.stop();
      }
      helperSignal.connectSignalr(user);
      proxy.on('allUser', (users) => {
        console.log('List Users: ', users);
        this.setState({
          listUsers: users,
          isLocalLoading: false
        });
      })
    })
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
