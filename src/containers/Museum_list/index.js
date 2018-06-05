import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
    View,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    Container,
    Text,
    Button,
    Content,
    Body,
    Thumbnail,
    Form,
    Item,
    Input,
    H1,
    H2,
    H3,
    H6,
    Picker
} from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as meseumListAction from "../../store/actions/containers/museumList_action";
import Loading from "../../components/Loading";
import ItemResult from '../../components/Item_result';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

const blockAction = false;
const blockLoadMoreAction = false;

class MuseumList extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        I18n.defaultLocale = "vi";
        I18n.locale = "vi";
        I18n.currentLocale();
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const locale = "vn";
        return (
            <Container style={styles.container}>
                <Grid>
                    <Row style={{ height: 50 }}>
                        <Col><Text style={styles.textSide}>Chọn địa danh</Text></Col>
                        <Col><Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            // iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            selectedValue={"Wallet"}
                            onValueChange={() => { }}
                        >
                            <Picker.Item label="Hà Nội" value="key0" />
                            <Picker.Item label="Đã Nẵng" value="key1" />
                            <Picker.Item label="TP.Hồ Chí Minh" value="key2" />
                            <Picker.Item label="Cần thơ" value="key3" />
                        </Picker></Col>
                    </Row>
                    <Row>
                        <FlatList
                            ref={ref => {
                                this.list = ref;
                            }}
                            style={styles.listResult}
                            data={[{}, {}, {}, {},{}, {}, {}, {},{}, {}, {}, {}]}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderFlatListItem.bind(this)}
                            numColumns={2}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            onEndReached={({ distanceFromEnd }) => {
                                if (distanceFromEnd > 0) {
                                    // // this.onEndReachedCalledDuringMomentum = true;
                                    // if (
                                    //     !blockLoadMoreAction &&
                                    //     !(listResult.length < pageSize)
                                    // ) {

                                    //     blockLoadMoreAction = true;
                                    //     this.smallLoading.show(),
                                    //         setTimeout(() => {
                                    //             searchAction.loadMore(
                                    //                 valuesForm,
                                    //                 currentPage,
                                    //                 pageSize,
                                    //                 user
                                    //             )
                                    //         }, 0);

                                    //     setTimeout(() => {
                                    //         if (loadEnd != true) {
                                    //             blockLoadMoreAction = false;
                                    //         }
                                    //     }, 700);
                                    // }
                                }
                            }}
                            onEndReachedThreshold={0.7}
                        />
                    </Row>
                </Grid>
            </Container>
        );
    }

    renderFlatListItem(dataItem) {
        const item = dataItem.item;
        return (
            <TouchableOpacity
                key={item.index}
                style={
                    styles.item_container_half
                }
                onPress={() => {
                    if (!blockAction) {
                        blockAction = true;

                    }
                }}
            >
                <ItemResult
                    key={item.index}
                    userName={'bach'}
                    position={'bền bền'}
                    phone={'đổi phone'}
                    avatarUrl={'https://q.bstatic.com/images/hotel/max1024x768/101/101428465.jpg'}
                    item={item}>
                </ItemResult>

            </TouchableOpacity>
        );
    }

    _keyExtractor(item, index) {
        return index;
    }
}
function mapStateToProps(state, props) {
    return {
        museumListReducer: state.museumListReducer,
        loginReducer: state.loginReducer
    };
}
function mapToDispatch(dispatch) {
    return {
        meseumListAction: bindActionCreators(meseumListAction, dispatch)
    };
}

MuseumList = connect(mapStateToProps, mapToDispatch)(MuseumList);
export default MuseumList;
