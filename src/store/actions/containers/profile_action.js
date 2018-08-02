import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function changeAvartar(avatarNew, user) {
    return dispatch => {
        let data = {
            id: user.userID,
            fullname: user.fullName,
            avatar: avatarNew
        };
        const searchParams = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        // AsyncStorage.setItem("@userLogin", JSON.stringify(user));
        fetch(`${AppConfig.API_UPLOAD_CHANGE_AVARTAR}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                "X-Requested-With": 'XMLHttpRequest',
                'Authorization': `Bearer ${user.access_token}`,
            },
            body: searchParams
        })
            .then((response) => {
                
                if (response.status != 200) {
                    dispatch(changeError());
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                if (responseJson && responseJson.success) {
                    dispatch(changeSuccess(avatarNew));
                }
                else{
                    dispatch(changeError());
                }
            })
            .catch((error) => {
                dispatch(changeError());
            });
    };
}
function changeSuccess(avatarNew) {
    return {
        type: types.CHANGE_AVARTAR,
        avatarNew: avatarNew
    };
}
function changeError() {
    alert('Thay đổi avatar thất bại')
    return {
        type: types.CHANGE_AVARTAR_ERROR,
    };
}