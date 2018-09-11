import React, { PureComponent, Component } from "react";
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
  Badge,
  Thumbnail
} from "native-base";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import * as AppConfig from "../../config/app_config";
const resolveAssetSource = require('resolveAssetSource');
const userAvar = require("../../resources/assets/user.jpg")
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, data } = this.props;
    var createDate = null;
    if (data.CreatedDate) {
      createDate = new Date(data.CreatedDate).toLocaleDateString();
    }
    //
    return (
      <View key={key} style={styles.itemList}>
        <Grid>
          <Col style={styles.colAvar}>
            <Thumbnail style={styles.avartar} source={{ uri: data.Avatar ? `${AppConfig.API_HOST}${data.Avatar}` : 'https://cdn.washingtoncitypaper.com/files/base/scomm/wcp/image/2009/04/640w/__contexts.org_socimages_files_2009_04_d_silhouette.jpg' }} />
            {data.Connected ? <View style={{
              position: 'absolute',
              bottom: 10,
              right: 16,
              width: 13,
              height: 13,
              borderRadius: 50,
              backgroundColor: '#94d82d'
            }}>
            </View> : null}
          </Col>
          <Col style={styles.colContent}>
            <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.userName}>{data.FullName}</Text>
              </Col>
              {/* <Col style={styles.colTimeStatus}>
                <Text style={{ fontSize: 14 }}>{createDate}</Text>
              </Col> */}
            </Row>
            <Row>
              {/* <Col style={styles.colUserMessage}>
                <Text style={styles.textMessage}>{data.Content ? this.textEclipse(data.Content) : ''}</Text>
              </Col> */}
              {/* <Col style={styles.colTimeStatus}>
                {data.CountNew && data.CountNew > 0 ?
                  <Badge style={{ backgroundColor: 'black', opacity: 0.8, position: 'absolute', right: 0, bottom: 5 }}>
                    <Text style={[{ color: 'white' }, styles.textMessage]}>{data.CountNew}</Text>
                  </Badge> : null}
              </Col> */}
            </Row>
          </Col>
        </Grid>
      </View>
    );
  }
  textEclipse(text) {
    return (((text).length >30) ?
      (((text).substring(0, 30)) + '...') :
      text)
  }
}
