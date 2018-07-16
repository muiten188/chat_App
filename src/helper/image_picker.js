var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Chọn',
    chooseFromLibraryButtonTitle: 'Chọn ảnh có sẵn',
    takePhotoButtonTitle: 'Chụp ảnh',
    cancelButtonTitle:'Hủy bỏ',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

let pick = (cb) => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            cb(source, response);
        }
    });
}

module.exports = pick;
