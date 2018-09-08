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
  Item,
  Thumbnail
} from "native-base";
import { StatusBar, Image, Platform, View, TouchableOpacity } from 'react-native';
import IconVector from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Grid, Col, Row } from "react-native-easy-grid/";
import styles from "./styles";
import I18n from "../../i18n/i18n";
import { Actions } from 'react-native-router-flux';
import * as appConfig from '../../config/app_config';
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
      onHeaderClick,
      onBack,
      user
    } = this.props;
    if (onBack) {
      _onBack = onBack;
    }
    var avartarUrl = null;
    if (user && user.avartar) {
      avartarUrl = `${appConfig.API_HOST_NO}${user.avartar}`;
    }
    return (
      <View style={styles.header}>
        {/* <StatusBar backgroundColor="#007db7"></StatusBar> */}
        <Grid>
          {showButtonLeft == true ? (
            <Col style={styles.itemButtonHeader}>
              <Button transparent onPress={_onBack}>
                <IconVector name="chevron-circle-left" size={20} style={styles.whileText} />
              </Button>
            </Col>
          ) : null}
          <Col style={styles.itemHeaderBody}>
            <Row style={styles.itemHeaderBody}>
              <TouchableOpacity onPress={onHeaderClick} style={styles.titleCon}>
                <Thumbnail style={{ height: 45, width: 45 }} source={{ uri: avartarUrl ? avartarUrl : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />

                {/* <Text style={styles.whileText}>{headerTitle ? headerTitle : I18n.t("easyLink", {
                  locale: "vn"
                })}</Text> */}
                <View style={{
                  position: 'absolute',
                  right: 2,
                  bottom: 2,
                  height: 14,
                  width: 14,
                  backgroundColor: '#94d82d',
                  borderRadius: 40,
                  borderWidth: 2.2,
                  borderColor: '#fff'
                }} />
              </TouchableOpacity>
            </Row>

          </Col>
          <Col style={styles.itemHeaderEnd}>
            <Button full transparent onPress={() => {
              Actions.chatEdit();
            }}>
              <IconVector name="edit" size={20} style={{}} />
            </Button>
          </Col>
          {/* <Col style={styles.itemHeaderEnd}>
            <Button transparent>
              <IconIonicons name="md-qr-scanner" size={24} style={{ color: '#fff' }} />
            </Button>
          </Col> */}
        </Grid>
      </View>
    );
  }
}
