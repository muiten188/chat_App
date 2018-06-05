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
  Thumbnail,
  Label
} from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import styles from "./styles";
import User from "../User";
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      total: 0
    };
    Number.prototype.format = function (n, x) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
    };
  }

  // componentDidMount() {
  //   const { listInvoiceDetail } = this.props;
  //   let total = 0;
  //   for (var i = 0; i < listInvoiceDetail.length; i++) {
  //     total = total + listInvoiceDetail[i].invoiceDetailAmount;
  //   }
  //   this.setState({
  //     total: total
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    // const { listInvoiceDetail } = this.props;
    // let total = 0;
    // for (var i = 0; i < listInvoiceDetail.length; i++) {
    //   total = total + listInvoiceDetail[i].invoiceDetailAmount;
    // }
    // this.setState({
    //   total: total
    // });
  }

  render() {
    const locale = "vn";
    const {
      bill,
      listInvoiceDetail,
      invoiceStatus,
      invoiceMonth,
      onTotal,
      onPayCash,
      onPayCredit
    } = this.props;
    const { state } = this;
    let total = 0;
    let totalPaid = 0;
    for (var i = 0; i < listInvoiceDetail.length; i++) {
      total =
        total +
        (listInvoiceDetail[i].invoiceDetailAmount == null || listInvoiceDetail[i].invoiceDetailAmount < 0
          ? 0
          : listInvoiceDetail[i].invoiceDetailAmount);
      totalPaid =
        totalPaid +
        (listInvoiceDetail[i].invoiceDetailPaid == null
          ? 0
          : listInvoiceDetail[i].invoiceDetailPaid);
    }
    return (
      <View style={styles.itemList}>
        <View
          style={[
            styles.header,
            invoiceStatus == "INCOMPLETE"
              ? styles.header_payed
              : styles.header_notPayed
          ]}
        >
          <Grid>
            <Col style={styles.headerLeft}>
              <Item disabled style={[styles.itemBorderNone, styles.flex_start]}>
                <Label>
                  {I18n.t("bill", {
                    locale: locale ? locale : "vn"
                  })}
                </Label>
                <Text>{invoiceMonth}</Text>
              </Item>
            </Col>
            <Col style={styles.headerRight}>
              <Item disabled style={[styles.itemBorderNone, styles.flex_end]}>
                <Label>
                  {I18n.t("status", {
                    locale: locale ? locale : "vn"
                  })}
                </Label>
                <Text
                  style={
                    invoiceStatus == "INCOMPLETE"
                      ? styles.text_paymented
                      : styles.text_notPayment
                  }
                >
                  {invoiceStatus == "INCOMPLETE"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </Text>
              </Item>
            </Col>
          </Grid>
        </View>
        <View style={styles.billContent}>

          {listInvoiceDetail.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row' }}>
                <View style={[styles.center, { flex: 1.2, minHeight: 35 }]}>{this.buildRowBillDetail(item, locale)}</View>
                <View style={[styles.center, { flex: 1, minHeight: 35 }]}><Text>{item.invoiceDetailAmount.format() + " "}</Text></View>
                <View style={[styles.center, { flex: 1, minHeight: 35 }]}><Text style={styles.primary}>
                  {item.invoiceDetailPaid != null &&
                    item.invoiceDetailPaid > 0
                    ? item.invoiceDetailPaid.format() + " "
                    : ""}
                </Text>
                </View>
              </View>
            );
          })}
          <Grid>
            {/* tổng tiền */}
            <Row style={[styles.itemTotal]}>
              <Col size={1.2} style={styles.center}>
                <H3 style={styles.textPadding}>
                  {I18n.t("billTotal", {
                    locale: locale ? locale : "vn"
                  })}
                </H3>
              </Col>
              <Col size={1} style={styles.center}>
                <Item
                  style={[
                    styles.itemBorderNone,
                    { height: 50 }
                  ]}
                  onPress={() => {
                    onTotal(total);
                  }}
                >
                  <H3 style={styles.textPadding}>{total.format() + " "}</H3>
                </Item>
              </Col>
              <Col style={[styles.center, { width: 160 }]}>
                <H3 style={[styles.primary, styles.textPadding]}>
                  {totalPaid.format() + " "}
                </H3>
              </Col>
            </Row>
            {invoiceStatus == "INCOMPLETE" ? (
              <Row style={[styles.itemPay]}>
                <Col />
                <Col>
                  <Button
                    style={[styles.right, styles.buttonPay]}
                    onPress={() => {
                      onPayCash(bill, listInvoiceDetail);
                    }}
                  >
                    <Text>
                      {I18n.t("totalCash", {
                        locale: locale ? locale : "vn"
                      })}
                    </Text>
                  </Button>
                </Col>
                <Col style={{ width: 160 }}>
                  <Button
                    style={[styles.right, styles.buttonPay]}
                    onPress={() => {
                      onPayCredit(bill, listInvoiceDetail);
                    }}
                  >
                    <Text>
                      {I18n.t("totalCredit", {
                        locale: locale ? locale : "vn"
                      })}
                    </Text>
                  </Button>
                </Col>
              </Row>
            ) : null}
          </Grid>
        </View>
      </View>
    );
  }

  buildRowBillDetail(item, locale) {
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Icon style={{ marginRight: 4 }} name="building" />
          <Label>
            {I18n.t("buildingCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Icon style={{ marginRight: 4 }} name="plug" />
          <Label>
            {I18n.t("billElectric", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Icon style={{ marginRight: 4 }} name="tint" />
          <Label>
            {I18n.t("billWater", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Icon style={{ marginRight: 4 }} name="motorcycle" />
          <Label>
            {I18n.t("motobike", {
              locale: locale ? locale : "vn"
            })}
            {item.vehiclePlate ? " (" + item.vehiclePlate + ")" : ""}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Icon style={{ marginRight: 4 }} name="car" />
          <Label>
            {I18n.t("car", {
              locale: locale ? locale : "vn"
            })}
            {item.vehiclePlate ? " (" + item.vehiclePlate + ")" : ""}
          </Label>
        </Item>
      );
    } else {
      return (
        <Item disabled style={styles.itemBorderNone}>
          <Label>
            {I18n.t("serviceOther", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    }
  }
}
