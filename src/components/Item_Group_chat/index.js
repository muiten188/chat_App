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
    return (
      <View key={key} style={styles.itemList}>
        <Grid>
          <Col style={styles.colAvar}>
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007db7',
              borderWidth: 0.5,
              borderColor: '#cccc'
            }}>
              <Icon name="group" style={{ color: '#fff' }} size={30} />
            </View>

            {/* <Thumbnail style={styles.avartar} large source={{ uri: data.Avatar ? `${AppConfig.API_HOST}${data.Avatar}` : 'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} /> */}
            {/* {data.Connected ? <View style={{
              position: 'absolute',
              bottom: 10,
              right: 16,
              width: 13,
              height: 13,
              borderRadius: 50,
              backgroundColor: '#94d82d'
            }}>
            </View> : null} */}
          </Col>
          <Col style={styles.colContent}>
            <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.userName}>{data.Name}</Text>
              </Col>
            </Row>
            {/* <Row>
              <Col style={styles.colUserMessage}>
                <Text style={styles.textMessage}>{}</Text>
              </Col>
            </Row> */}
          </Col>
          {(data.Count > 0) ?
            <Col style={styles.colTimeStatus}>
              <Badge style={{ backgroundColor: 'black', opacity: 0.8 }}>
                <Text style={[{ color: 'white' }, styles.textMessage]}>{data.Count}</Text>
              </Badge>
            </Col> : null}
        </Grid>
      </View>
    );
  }
}
