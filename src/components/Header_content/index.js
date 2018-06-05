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
  H5,
  Item
} from "native-base";
import { StatusBar, Image, Platform } from 'react-native';
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Grid, Col, Row } from "react-native-easy-grid/";
import styles from "./styles";
import I18n from "../../i18n/i18n";
import { Actions } from 'react-native-router-flux';
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let _onBack = () => {
      Actions.pop();
    };
    const {
      showButtonLeft,
      headerTitle,
      onBack
    } = this.props;
    if (onBack) {
      _onBack = onBack;
    }
    return (
      <Header style={styles.header}>
        {/* <StatusBar backgroundColor="#007db7"></StatusBar> */}
        <Grid>
          {showButtonLeft == true || Platform.OS === 'ios' ? (
            <Col style={styles.itemButtonHeader}>
              <Button transparent onPress={_onBack}>
                <IconVector name="chevron-circle-left" size={20} style={styles.whileText} />
              </Button>
            </Col>
          ) : null}
          <Col style={styles.itemHeaderBody}>
            <Row>
              <Col style={styles.iconTitle}>
                <Image source={require("../../resources/assets/icon_title.png")} style={{ height: 35, resizeMode: 'contain' }}></Image>
              </Col>
              <Col style={styles.itemHeaderBody}>
                <Text style={styles.whileText}>{headerTitle ? headerTitle : I18n.t("easyLink", {
                  locale: "vn"
                })}</Text>
              </Col>
            </Row>

          </Col>
          <Col style={styles.itemHeaderEnd}>
            <Button transparent>
              <IconVector name="search" size={20} style={{ color: '#fff' }} />
            </Button>
          </Col>
          <Col style={styles.itemHeaderEnd}>
            <Button transparent>
              <IconIonicons name="md-qr-scanner" size={24} style={{ color: '#fff' }} />
            </Button>
          </Col>
        </Grid>
      </Header>
    );
  }
}
