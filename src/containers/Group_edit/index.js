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
import Loading from "../../components/Loading";
import * as groupEditAction from "../../store/actions/containers/groupEdit_action";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import { connection, proxy } from '../../helper/signalr';
import * as helperSignal from '../../helper/signalr';
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
      listUsersGroups: [],
      _listUsers: null,
      render: false
    }
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    try {
      this.onEventSignal();
      const { groupEdit } = this.props;
      if (groupEdit) {
        this.setState({ groupName: groupEdit.Name })
        if (proxy.connection.state == 1) {
          proxy.invoke('getListUserInGroup', groupEdit.ID);
        }
        else {
          helperSignal.onReconnect(() => {
            proxy.invoke('getListUserInGroup', groupEdit.ID);
          });
        }
      }
      else {
        if (proxy.connection.state == 1) {
          proxy.invoke('getUserForGroup');
        }
        else {
          helperSignal.onReconnect(() => {
            proxy.invoke('getUserForGroup');
          });
        }
      }
    }
    catch (err) {

    }
  }

  onEventSignal() {
    var self = this;

    proxy.on('listUserInGroup', (usersGroup) => {
      self.setState({
        listUsersGroups: usersGroup
      });
    })

    proxy.on('getAllUserForGroup', (usersGroup) => {
      self.setState({
        listUsersGroups: usersGroup
      });
    })
    proxy.on('createGroupSuccess', (Name, ID) => {
      if (connection && connection.state == 1) {
        proxy.invoke('loadAllGroup');
        Alert.alert('Thông báo', "Thêm nhóm thành công", [{
          text: 'Ok',
          onPress: (e) => {
            Actions.pop();
            Actions.pop();
          }
        }],
          { cancelable: false });
      } else {
        helperSignal.onReconnect(() => {
          proxy.invoke('loadAllGroup');
          Alert.alert('Thông báo', "Thêm nhóm thành công", [{
            text: 'Ok',
            onPress: (e) => {
              Actions.pop();
              Actions.pop();
            }
          }],
            { cancelable: false });
        });
      }
    })
    proxy.on('alertMessage', (message, isSuccess) => {
      if (this.props.groupEdit && isSuccess) {
        if (connection && connection.state == 1) {
          proxy.invoke('loadAllGroup');
          Alert.alert('Thông báo', message, [{
            text: 'Ok',
            onPress: (e) => {
              Actions.pop();
            }
          }],
            { cancelable: false });
        } else {
          helperSignal.onReconnect(() => {
            proxy.invoke('loadAllGroup');
            Alert.alert('Thông báo', message, [{
              text: 'Ok',
              onPress: (e) => {
                Actions.pop();
              }
            }],
              { cancelable: false });
          });
        }
      }
      if (!isSuccess) {
        Alert.alert('Thông báo', message);
      }
    })

  }

  componentWillUnmount() {
    proxy.off('getAllUserForGroup');
    proxy.off('createGroupSuccess');
    proxy.off('alertMessage');
  }

  componentDidUpdate(prevProps, prevState) {

  }

  filterSearch(value) {
    let { listUsersGroups } = this.state;
    if (value != '') {
      var _listUsers = listUsersGroups.filter(user => user.FullName.toLowerCase().indexOf(value.toLowerCase()) != -1)
      this.setState({
        _listUsers: _listUsers,
      })
    }
    else {
      this.setState({
        _listUsers: null,
      })
    }
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
              disabled={this.props.groupEdit}
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
                this.filterSearch(value);
              }}></Input>
          </Row>
          <Row style={{ paddingBottom: 60 }}>
          <Loading isShow={this.state.listUsersGroups && this.state.listUsersGroups.length == 0} />
            <FlatList
              ref={ref => {
                this.list = ref;
              }}
              style={styles.listResult}
              data={this.state._listUsers ? this.state._listUsers : this.state.listUsersGroups}
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
            if (this.state.groupName == '') {
              Alert.alert('Thông báo', 'Tên nhóm trống vui lòng nhập tên nhóm!');
              return;
            }
            var userGroups = this.state.listUsersGroups.filter(userGroup => userGroup.IsChecked == true);

            var _userGroups = [];
            for (var i = 0; i < userGroups.length; i++) {
              _userGroups.push(userGroups[i].UserName);
            }

            if (this.props.groupEdit) {
              var userGroupsRemove = this.state.listUsersGroups.filter(userGroup => userGroup.IsChecked == false);
              var _userGroupsRemove = [];
              for (var i = 0; i < userGroupsRemove.length; i++) {
                _userGroupsRemove.push(userGroupsRemove[i].UserName);
              }
              if (proxy.connection.state == 1) {
                proxy.invoke('updateUserGroup', _userGroups, this.state.groupName, _userGroupsRemove);
              }
              else {
                helperSignal.onReconnect(() => {
                  proxy.invoke('updateUserGroup', _userGroups, this.state.groupName, _userGroupsRemove);
                });
              }
            }
            else {
              if (proxy.connection.state == 1) {
                proxy.invoke('addUserGroup', _userGroups, this.state.groupName);
              }
              else {
                helperSignal.onReconnect(() => {
                  proxy.invoke('addUserGroup', _userGroups, this.state.groupName);
                });
              }
            }
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
          this.setState({ listUsersGroups: arrUserGroup, render: !this.state.render });
        }}
      >
        <Grid>
          <Col style={styles.colAvar}>
            <Thumbnail style={styles.avartar} source={{ uri: 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
          </Col>
          <Col style={styles.colContent}>
            <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.userName}>{item.FullName}</Text>
              </Col>
              <Col style={styles.colTimeStatus}>
                <CheckBox color={"#448fcd"} onPress={(value) => {
                  var arrUserGroup = this.state.listUsersGroups;
                  for (var i = 0; i < arrUserGroup.length; i++) {
                    if (arrUserGroup[i].UserID == item.UserID) {
                      arrUserGroup[i].IsChecked = !arrUserGroup[i].IsChecked;
                    }
                  }
                  this.setState({ listUsersGroups: arrUserGroup, render: !this.state.render });
                }} checked={item.IsChecked} />
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
