import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  H3,
  H2,
  H1,
  Item,
  Thumbnail,
  Label
} from "native-base";
import { View, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import I18n from "../../i18n/i18n";
const currentDate = new Date();
export default class extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    let prevMonth = currentDate.getMonth()+1 == 1 ? 12 : currentDate.getMonth()+1 - 1;
    let prevYear = currentDate.getMonth()+1 == 1 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    let currentMonth = currentDate.getMonth()+1;
    let currentYear = currentDate.getFullYear();
    let nextMonth = currentDate.getMonth()+1 == 12 ? 1 : currentDate.getMonth()+1 + 1;
    let nextYear = currentDate.getMonth()+1 == 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    this.state = {
      language: 'java',
      prevMonth: prevMonth,
      prevYear: prevYear,
      currentMonth: currentMonth,
      currentYear: currentYear,
      nextMonth: nextMonth,
      nextYear: nextYear
    }
  }

  _onNextMonth() {
    const { state } = this;
    const { onChange } = this.props;
    let prevMonth = state.prevMonth + 1 > 12 ? 1 : state.prevMonth + 1;
    let prevYear = state.prevMonth + 1 > 12 ? state.prevYear + 1 : state.prevYear;
    let currentMonth = state.currentMonth + 1 > 12 ? 1 : state.currentMonth + 1;
    let currentYear = state.currentMonth + 1 > 12 ? state.currentYear + 1 : state.currentYear;
    let nextMonth = state.nextMonth + 1 > 12 ? 1 : state.nextMonth + 1;
    let nextYear = state.nextMonth + 1 > 12 ? state.nextYear + 1 : state.nextYear;
    onChange(currentMonth,currentYear);
    this.setState(
      {
        prevMonth: prevMonth,
        prevYear: prevYear,
        currentMonth: currentMonth,
        currentYear: currentYear,
        nextMonth: nextMonth,
        nextYear: nextYear
      }
    )
  }

  _onPrevMonth() {
    const { state } = this;
    const { onChange } = this.props;
    let prevMonth = state.prevMonth - 1 < 1 ? 12 : state.prevMonth - 1;
    let prevYear = state.prevMonth - 1 < 1 ? state.prevYear - 1 : state.prevYear;
    let currentMonth = state.currentMonth - 1 < 1 ? 12 : state.currentMonth - 1;
    let currentYear = state.currentMonth - 1 < 1 ? state.currentYear - 1 : state.currentYear;
    let nextMonth = state.nextMonth - 1 < 1 ? 12 : state.nextMonth - 1;
    let nextYear = state.nextMonth - 1 < 1 ? state.nextYear - 1 : state.nextYear;
    onChange(currentMonth,currentYear);
    this.setState(
      {
        prevMonth: prevMonth,
        prevYear: prevYear,
        currentMonth: currentMonth,
        currentYear: currentYear,
        nextMonth: nextMonth,
        nextYear: nextYear
      }
    )
  }

  render() {
    const { locale = "vn" } = this.props;
    const { onChange } = this.props;
    const { state } = this;
    return (
      <View style={styles.datePicker_Container}>
        <Grid>
          {/* <Col style={{ width: 60, backgroundColor: '#fff' }}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </Col> */}
          <Col>
            <View style={styles.content_Header}>
              <Item style={[styles.borderBottomNone, styles.center]}>
                <Button style={styles.buttonChangeDate} onPress={this._onPrevMonth.bind(this)}>
                  <Icon name="chevron-left"></Icon>
                </Button>
                <Item style={[styles.borderBottomNone]}>
                  <Text style={[styles.prev_next_text, styles.text_center]}>{state.prevMonth + "/" + state.prevYear}</Text>
                  <Text style={[styles.current_Text, styles.text_center]}>{state.currentMonth + "/" + state.currentYear}</Text>
                  <Text style={[styles.prev_next_text, styles.text_center]}>{state.nextMonth + "/" + state.nextYear}</Text>
                </Item>
                <Button style={styles.buttonChangeDate} onPress={this._onNextMonth.bind(this)}>
                  <Icon name="chevron-right"></Icon>
                </Button>
              </Item>
            </View>
          </Col>
        </Grid>
      </View>
    );
  }
}
