import React from "react";
const FBSDK = require('react-native-fbsdk');

import {
  View
} from "react-native";
import { Button, Text, Thumbnail, Container, Badge,H3 } from "native-base";
import IconVector from "react-native-vector-icons/FontAwesome";
import * as AppConfig from "../../config/app_config";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { Grid, Col, Row } from "react-native-easy-grid";


class user extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      username: "",
      fullName: "Tên Người Dùng",
      phoneNumber: "",
      birthDay: "",
      email: "",
      avatar: "",
      identification: ""
    };
  }


  componentDidMount() {

  }


  render() {
    const { state } = this;
    const {user}=this.props;
    debugger;
    var avartarUrl=null;
    if(user&&user.avartar){
      avartarUrl=`${AppConfig.API_HOST_NO}${user.avartar}`;
    }
    return (
      <View style={styles.viewContain}>
        <Grid>
          <Col style={styles.avartarCol}>
            <Thumbnail style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: avartarUrl?avartarUrl:'http://images6.fanpop.com/image/photos/40600000/PRISTIN-WE-LIKE-Promotion-Nayoung-pristin-40694319-500-333.jpg' }} />
          </Col>
          <Col style={{
            justifyContent: "center",
            alignItems: "flex-start",
          }}>
          <Row>

          </Row>
            <Row style={{justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft:10,
            width:'100%'}}>
              <H3>{user.fullName}</H3>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Badge primary>
                <Text>{user.username}</Text>
              </Badge>
            </Row>
            <Row/>
            <Row/>
          </Col>
        </Grid>
      </View>
    );
  }
}
export default user;
