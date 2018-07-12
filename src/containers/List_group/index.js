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
import * as listGroupAction from "../../store/actions/containers/listChat_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import HeaderContent from '../../components/Header_content';
import ItemGroupChat from '../../components/Item_Group_chat';

const blockAction = false;
const blockLoadMoreAction = false;
import { proxy, connection } from '../../helper/signalr';
import * as helper from '../../helper';
import * as helperSignal from '../../helper/signalr';
class ListGroup extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      listGroups: [],
      isLocalLoading: true
    }

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentDidMount() {
    try {
      this.onEventSignal();
      proxy.invoke('loadAllGroup');
    }
    catch (err) {

    }

  }

  onEventSignal() {
    var self = this;
    proxy.on('allGroup', (groups, total) => {

      self.setState({
        listGroups: groups,
        isLocalLoading: false
      });
    })
    proxy.on('addCountMessageGroup', (groupId) => {
      var listGroups = this.state.listGroups;
      for (var i = 0; i < listGroups.length; i++) {
        var group = listGroups[i];
        if (group.ID == groupId) {
          listGroups[i].Count = listGroups[i].Count + 1;
          break;
        }
      }
      self.setState({
        listGroups: listGroups,
      });
    })
    proxy.on('devCountMessageGroup', (groupId, count) => {
      if (count > 0) {
        var listGroups = this.state.listGroups;
        for (var i = 0; i < listGroups.length; i++) {
          var group = listGroups[i];
          if (group.ID == groupId) {
            listGroups[i].Count = 0;
            break;
          }
        }
        self.setState({
          listGroups: listGroups,
        });
      }
    })
  }

  onConnectSignal(promise) {
    promise.done((value) => {
      var user = JSON.parse(value);
      if (proxy) {
        connection.stop();
      }
      helperSignal.connectSignalr(user);
      this.props.loginReducer.user = user;
      this.onEventSignal();
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
          data={this.state.listGroups}
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
          Actions.chatScreen({ user: this.props.loginReducer.user, group: item, isGroupChat: true });
          // }
        }}
      >
        <ItemGroupChat data={item}></ItemGroupChat>

      </TouchableOpacity>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

}
function mapStateToProps(state, props) {
  return {
    listGroupReducer: state.listGroupReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    listGroupAction: bindActionCreators(listGroupAction, dispatch)
  };
}

ListGroup = connect(mapStateToProps, mapToDispatch)(ListGroup);
export default ListGroup;
