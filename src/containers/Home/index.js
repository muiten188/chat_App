import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
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
  H3,
  Tab, Tabs, TabHeading
} from "native-base";
import styles from "./styles";
import HeaderForm from "../../components/Header_form";
import HeaderContent from "../../components/Header_content";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Field, reduxForm } from "redux-form";
import { DateField } from "../../components/Element/Form";
import ItemResult from "../../components/Item_result";
import * as homeAction from "../../store/actions/containers/home_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ChatSreen from '../Chat_screen';
import Profile from '../Profile';
import ListChat from '../List_chat';
import ListGroup from '../List_group';
import * as helper from '../../helper/signalr';
import * as _helper from '../../helper';
const blockAction = false;
const blockLoadMoreAction = false;

class Home extends Component {
  currentApartment = {};
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      tabActivePosition: 0
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();

  }

  componentDidMount() {
    if (this.props.loginReducer.user != null) {
      _helper.setAsyncStorage("@user", this.props.loginReducer.user);
    }

  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props.navigation;
    const { isLoading, listResult } = this.props.homeReducer;
    // if (this.loading.getState() == true) {
    //   this.loading.hide();
    // }
    // if (this.smallLoading.getState() == true) {
    //   this.smallLoading.hide();
    // }
    // if (
    //   listResult.length == 1 &&
    //   listResult[0].apartmentId != this.currentApartment.apartmentId
    // ) {
    //   if (!blockAction) {
    //     blockAction = true;
    //     this.currentApartment = listResult[0];
    //     //push
    //     setTimeout(() => {
    //       blockAction = false;
    //     }, 700);
    //   }
    // }
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const {
      listResult,
      isLoading,
      searchErorr,
      valuesForm,
      currentPage,
      pageSize,
      loadEnd
    } = this.props.homeReducer;
    blockLoadMoreAction = loadEnd;
    const { homeAction } = this.props;
    const { user } = this.props.loginReducer;
    if (searchErorr == true) {
      Alert.alert(
        "Thông báo",
        "Tìm kiếm lỗi kiểm tra lại đường truyền.",
        [
          {
            text: "Ok",
            onPress: e => {
              homeAction.clearError();
            }
          }
        ],
        { cancelable: false }
      );
    }
    return (

      <Container style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container_outer}
          keyboardVerticalOffset={-350}
        >
          <Grid>
            <Col size={68} style={[styles.grid_col, styles.col_content]}>
              <View style={{ position: 'absolute', bottom: 4, left: 4, width: 34, height: 34 }}>
                <Loading ref={ref => {
                  this.smallLoading = ref;
                }} />
              </View>
              <HeaderContent />
              <View style={styles.listResult_container}>
                <Tabs initialPage={0}
                  tabBarPosition={'bottom'}
                  tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                  tabBarTextStyle={{ color: 'red' }}
                  style={{ backgroundColor: 'transparent' }}
                  onChangeTab={(obj) => {
                    var from = obj.from;
                    var index = obj.i;
                    this.setState({ tabActivePosition: index })
                  }}
                >
                  <Tab
                    heading={<TabHeading style={this.state.tabActivePosition == 0 ? styles.tabHeadingActive : styles.tabHeading}>
                      <Grid>
                        <Row style={styles.iconTab}>
                          <IconIonicons name="md-chatboxes" size={20} style={this.state.tabActivePosition == 0 ? styles.textHeaderTabActive : {}} />
                        </Row>
                        <Row style={styles.textHeadingTab}>
                          <Text style={this.state.tabActivePosition == 0 ? styles.textHeaderTabActive : styles.textHeaderTab}>{I18n.t("conversation", {
                            locale: "vn"
                          })}</Text>
                        </Row>
                      </Grid>
                    </TabHeading>}>
                    <ListChat />

                  </Tab>
                  <Tab
                    heading={<TabHeading style={this.state.tabActivePosition == 1 ? styles.tabHeadingActive : styles.tabHeading}>
                      <Grid>
                        <Row style={styles.iconTab}>
                          <IconIonicons name="md-chatboxes" size={20} style={this.state.tabActivePosition == 1 ? styles.textHeaderTabActive : {}} />
                        </Row>
                        <Row style={styles.textHeadingTab}>
                          <Text style={this.state.tabActivePosition == 1 ? styles.textHeaderTabActive : styles.textHeaderTab}>{I18n.t("Group", {
                            locale: "vn"
                          })}</Text>
                        </Row>
                      </Grid>
                    </TabHeading>}>
                    <ListGroup />

                  </Tab>
                  <Tab heading={<TabHeading style={this.state.tabActivePosition == 2 ? styles.tabHeadingActive : styles.tabHeading}>
                    <Grid>
                      <Row style={styles.iconTab}>
                        <IconVector name="user" size={20} style={this.state.tabActivePosition == 2 ? styles.textHeaderTabActive : {}} />
                      </Row>
                      <Row style={styles.textHeadingTab}>
                        <Text style={this.state.tabActivePosition == 2 ? styles.textHeaderTabActive : styles.textHeaderTab}>{I18n.t("profile", {
                          locale: "vn"
                        })}</Text>
                      </Row>
                    </Grid>
                  </TabHeading>}>
                    <Profile />
                  </Tab>
                </Tabs>
                <Loading
                  ref={ref => {
                    this.loading = ref;
                  }}
                  isShow={isLoading}
                />
              </View>
            </Col>
          </Grid>
        </KeyboardAvoidingView>
      </Container >
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    const { listResult } = this.props.homeReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={styles.item_container_full
        }
        onPress={() => {
          if (!blockAction) {
            blockAction = true;
            setTimeout(() => {
              blockAction = false;
            }, 800);
          }
        }}
      >
        <ItemResult
          key={item.index}
          userName={item.ownerName}
          position={item.apartmentName}
          phone={item.ownerPhone}
          avatarUrl={item.avatarUrl}
          item={item}
        />
        {item.paymentStatus == true ? <Icon style={styles.check_half} name="check"></Icon> : null}

      </TouchableOpacity>
    );
  }
  _keyExtractor(item, index) {
    return index;
  }
}
function mapStateToProps(state, props) {
  return {
    homeReducer: state.homeReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    homeAction: bindActionCreators(homeAction, dispatch)
  };
}
// export default reduxForm({
//   form: "search"
// })(connect(mapStateToProps, mapToDispatch)(search));

// search = reduxForm({
//   form: "search"
//   // enableReinitialize: true
// })(search);
Home = connect(mapStateToProps, mapToDispatch)(Home);
export default Home;
