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

class ListChat extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <HeaderContent />
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.listResult}
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
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
          Actions.chatScreen();
          // }
        }}
      >
        <ItemChat></ItemChat>

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
