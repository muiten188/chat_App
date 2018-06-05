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
import * as findGuiderAction from "../../store/actions/containers/findGuider_action";
import Loading from "../../components/Loading";
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

const blockAction = false;
const blockLoadMoreAction = false;

class FindGuider extends Component {

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
            <Text>abc2</Text>
      </Container>
    );
  }

  
}
function mapStateToProps(state, props) {
  return {
    findGuiderReducer: state.findGuiderReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    findGuiderAction: bindActionCreators(findGuiderAction, dispatch)
  };
}

FindGuider = connect(mapStateToProps, mapToDispatch)(FindGuider);
export default FindGuider;
