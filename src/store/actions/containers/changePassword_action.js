import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";

export function changePassword(value, user) {
    return dispatch => {
        var accessToken = user.access_token;
        dispatch(_changePasswording());
        var obj={
            id:user.userID,
            password:value.password
        }
        const oParams = Object.keys(obj).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
        // AsyncStorage.setItem("@userCHANGE_PASSWORD", JSON.stringify(user));
        fetch(`${AppConfig.API_CHANGE_PASSWORD}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `Bearer ${accessToken}`,
                "X-Requested-With": 'XMLHttpRequest'
            },
            body: oParams
        })
            .then(function (response) {
                debugger;
                if (response.status != 200) {
                    dispatch(_changePassword(false));
                } else {
                    dispatch(_changePassword(true, user));
                }
            })
            .catch(function (error) {
                dispatch(_changePassword(false));
            });
    };
}

export function _changePasswording() {
    return {
        type: types.CHANGE_PASSWORDG
    };
}

export function _changePassword(status, user) {

    if (status) {
        return {
            type: types.CHANGE_PASSWORD_SUCCESS,
            user: user,
        };
    } else {
        return {
            type: types.CHANGE_PASSWORD_EROR,
        };
    }
}

export function resetChangePassword(){
    return {
        type: types.CHANGE_PASSWORD_RESET,
    };
}