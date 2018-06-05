import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  H3,
  Item
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
export default class extends Component {
  static navigationOptions = {
    header: null
  };
  
  render() {
    const { showButtonLeft, headerTitle, showUser, showSearch,onSearch,onBack } = this.props;
    return (
      <Header style={styles.header}>
        <Grid>
          {showButtonLeft == true ? (
            <Col style={styles.itemButtonHeader}>
              <Button transparent onPress={onBack}>
                <Icon name="arrow-back" />
              </Button>
            </Col>
          ) : null}
          <Col style={styles.itemHeaderBody}>
            <H3 style={[styles.text]}>{headerTitle}</H3>
          </Col>
          {showUser == true ? (
            <Col style={styles.itemHeader}>
              <User
                actions={["Đăng xuất"]}
              />
            </Col>
          ) : null}
          {showSearch == true ? (
            <Col style={styles.itemHeader}>
              <Button transparent style={styles.buttonSearch} onPress={onSearch}>
                <Text style={styles.text} uppercase={false}>Tìm kiếm</Text>
                <Icon name="search" />
              </Button>
            </Col>
          ) : null}
        </Grid>
      </Header>
    );
  }
}
