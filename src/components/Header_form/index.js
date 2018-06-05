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
    const {
      showButtonLeft,
      headerTitle,
      showUser,
      showSearch,
      onSearch,
      onBack
    } = this.props;
    return (
      <Header style={styles.header}>
        <Grid>
          <Col style={styles.itemButtonHeader}>
            <Button transparent onPress={onBack}>
              <Icon style={styles.iconBack} name="arrow-back" />
            </Button>
          </Col>
          <Col style={styles.itemHeaderBody}>
            <H3 style={[styles.text]}>{headerTitle}</H3>
          </Col>
        </Grid>
      </Header>
    );
  }
}
