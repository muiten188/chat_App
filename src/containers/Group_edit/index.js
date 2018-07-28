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
  CheckBox
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import * as groupEditAction from "../../store/actions/containers/groupEdit_action";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection, proxy } from '../../helper/signalr';
import HeaderContent from "../../components/Header_content";

class Profile extends Component {

  static navigationOptions = {
    title: "Nhóm mới",
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0.7,
      borderBottomColor: '#dadadc'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupNameSearch: '',
      listUsersGroups: []
    }
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    try {
      this.onEventSignal();
      if (proxy.connection.state == 1) {
        proxy.invoke('getUserForGroup');
      }
      else {
        helperSignal.onReconnect(() => {
          proxy.invoke('getUserForGroup');
        });
      }
    }
    catch (err) {

    }
  }

  onEventSignal() {
    var self = this;
    proxy.on('getAllUserForGroup', (usersGroup) => {
      self.setState({
        listUsersGroups: usersGroup
      });
    })
  }

  componentWillUnmount() {
    proxy.off('getAllUserForGroup');
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const locale = "vn";
    const { groupEditAction, loginReducer } = this.props;
    return (
      <Container style={styles.container}>
        {/* <HeaderContent  /> */}
        <Grid>
          <Row style={{ height: 80, backgroundColor: '#448fcd', opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500' }}>{this.state.groupName}</Text> */}
            <Input style={{
              textAlign: 'center',
              fontSize: 24,
              color: '#fff',
              fontWeight: '500',
              color: '#fff'
            }}
              placeholder={"Tên nhóm"}
              value={this.state.groupName}
              onChangeText={(value) => {
                this.setState({ groupName: value })
              }}></Input>
          </Row>
          <Row style={{
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 25,
            paddingRight: 25,
          }}>
            <Input style={{
              textAlign: 'center',
              borderBottomColor: '#cecece',
              borderBottomWidth: 0.5,
            }}
              placeholder={"Tìm kiếm"}
              value={this.state.groupNameSearch}
              onChangeText={(value) => {
                this.setState({ groupNameSearch: value })
              }}></Input>
          </Row>
          <Row style={{ paddingBottom: 60 }}>
            <FlatList
              ref={ref => {
                this.list = ref;
              }}
              style={styles.listResult}
              data={this.state.listUsersGroups ? this.state.listUsersGroups : [{}, {}, {}, {}, {}, {}, {}]}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderFlatListItem.bind(this)}
              numColumns={1}
              onEndReachedThreshold={0.7}
            />
          </Row>
        </Grid>
        <TouchableOpacity
          onPress={() => {
            Actions.groupEdit();
          }}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 50,
            bottom: 5,
            right: 10,
            backgroundColor: '#1686d7',
            justifyContent: 'center',
            alignItems: 'center'
          }}><Icon name="arrow-right" size={20} style={{ color: '#fff' }}></Icon></TouchableOpacity>
      </Container>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    debugger;
    return (
      <TouchableOpacity
        key={item.index}
        style={
          styles.item_GroupUser
        }
        onPress={() => {
          var arrUserGroup = this.state.listUsersGroups;
          for (var i = 0; i < arrUserGroup.length; i++) {
            if (arrUserGroup[i].UserID == item.UserID) {
              arrUserGroup[i].IsChecked = !arrUserGroup[i].IsChecked;
            }
          }
          this.setState({ listUsersGroups: arrUserGroup });
        }}
      >
        <Grid>
          <Col style={styles.colAvar}>
            <Thumbnail style={styles.avartar} source={{ uri: 'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} />
          </Col>
          <Col style={styles.colContent}>
            <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.userName}>{item.FullName}</Text>
              </Col>
              <Col style={styles.colTimeStatus}>
                <CheckBox color={"#448fcd"} checked={item.IsChecked} />
              </Col>
            </Row>
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  }

}
function mapStateToProps(state, props) {
  return {
    groupEditReducer: state.groupEditReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    groupEditAction: bindActionCreators(groupEditAction, dispatch),
  };
}

Profile = connect(mapStateToProps, mapToDispatch)(Profile);
export default Profile;
