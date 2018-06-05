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
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import I18n from "../../i18n/i18n";
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { locale = "vn" } = this.props;
    const { isCash, totalMoney, content, date, tranCode } = this.props;
    return (
      <View style={styles.itemList}>
        <View style={styles.header}>
          <Grid>
            <Col style={[styles.center, styles.left]}>
              <Text>{date}</Text>
            </Col>
            <Col style={[styles.center, styles.right]}>
              <Text style={styles.tranCode}>{tranCode}</Text>
            </Col>
          </Grid>
        </View>
        <View style={styles.item}>
          {isCash ?
            <Item disabled style={[styles.itemPostion, styles.borderBottomNone]}>
              <Icon name="money" style={styles.icon} />
              <Text>{I18n.t("cash", {
                locale: locale ? locale : "vn"
              })}</Text>
            </Item>
            :
            <Item disabled style={[styles.itemPostion, styles.borderBottomNone]}>
              <Icon name="credit-card-alt" style={styles.icon} />
              <Text>{I18n.t("credit", {
                locale: locale ? locale : "vn"
              })}</Text>
            </Item>
          }
          <Item disabled style={[styles.borderBottomNone, styles.itemCash]}>
            <H1 style={[styles.pay_item, styles.totalPay,styles.textPadding]}>{totalMoney + " VNĐ"}</H1>
          </Item>
          <Item disabled style={[styles.itemPhone, styles.borderBottomNone]}>
            <Label>{I18n.t("content", {
              locale: locale ? locale : "vn"
            })}</Label>
            <Text>{content}</Text>
          </Item>
        </View>
      </View>
    );
  }
}
