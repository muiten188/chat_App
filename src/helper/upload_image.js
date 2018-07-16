import RNFetchBlob from 'react-native-fetch-blob'
import * as appConfig from '../config/app_config';
let upload = (data, accessToken) => {
    return RNFetchBlob.fetch('POST', `${appConfig.API_UPLOAD_IMAGE}`, {
        Authorization: `Bearer ${accessToken}`,
        "X-Requested-With":'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
    }, data);
}

module.exports = upload;
