import React, { Component } from "react";

import { Item, Input, Text, Label, View, CheckBox, Button } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
// import Switch from '../Switch'

// import material from '../../../themes/material'
import styles from "./styles";
import DatePicker from "../../DatePicker";
// import Dropdown from '../../Dropdown'
// import Toggle from '../../Toggle'

export function InputField({
  input,
  label,
  onClear,
  meta: { touched, error, warning, active },
  icon,
  addon,
  onPress,
  style,
  inputStyle,
  ...custom
}) {
  return (
    <Item
      style={{ ...styles.item, ...style }}
      error={touched && !!error}
      onPress={onPress}
    >
      {addon}
      {icon && <Icon style={styles.inputIcon} name={icon} size={25} />}
      <Input
        size={70}
        placeholder={label}
        {...input}
        {...custom}
        style={{ ...styles.input, ...inputStyle }}
      />
      {touched && error ? <View style={{ minWidth: 20}}><Text >{error}</Text></View> : null}
      {active && onClear ? (
        <Button
          transparent
          style={{ width: 24, marginRight: -10 }}
          onPress={onClear ? onClear : () => { }}
        >
          <Icon name="times" style={{ paddingLeft: 5 }} />
        </Button>
      ) : (
          null
        )}
    </Item>
  );
}

// export const CheckBoxField = ({ input, label, meta: { touched, error, warning }, style, checkboxStyle, labelStyle, ...custom }) => (
//   <View style={{...styles.checkboxContainer, ...style}} >
//     <CheckBox
//       checked={!!input.value}
//       {...custom}
//       style={{...styles.checkbox, ...checkboxStyle}}
//       onPress={e=>input.onChange(!input.value)}
//     />
//     {label && <Text textSmall={custom.large===undefined} style={{
//       ...styles.label,
//       fontSize:material.fontSizeBase * (custom.large ? 0.9 : 0.7),
//       lineHeight: Math.round(material.lineHeight * (custom.large ? 0.7 : 0.6)),
//       marginLeft: custom.large ? 20 : 15,
//       ...labelStyle
//     }}>{label}</Text>}
//   </View>
// )

// export const SwitchField = ({ input, meta: { touched, error, warning }, ...custom }) => (
//   <Switch
//     value={!!input.value}
//     width={45}
//     circleColor={material.activeTab}
//     backgroundActive={material.tabBarActiveTextColor}
//     backgroundInactive="#898989"
//     onSyncPress={input.onChange}
//     {...custom}
//   />
// )

export const DateField = ({
  input,
  label,
  meta: { touched, error, warning },
  style,
  inputStyle,
  iconStyle,
  format = "MM/DD/YYYY",
  ...custom
}) => (
    <DatePicker
      date={input.value}
      mode="date"
      placeholder={label}
      onDateChange={date => input.onChange(date)}
      customStyles={{
        dateTouch: { ...styles.item, ...style },
        dateInput: { ...styles.input, ...inputStyle },
        dateIcon: { ...styles.inputIcon, ...iconStyle }
      }}
      format={format}
      {...custom}
    />
  );

// export const LockField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
//   <Toggle
//     checked={input.value}
//     title={label}
//     onToggle={(value) => input.onChange(value)}
//     {...custom}
//   />
// )

// export const DropdownField = ({ input, label, meta: { touched, error, warning }, onSelected, ...custom }) => (
//   <Dropdown error={touched && !!error}
//     selected={input.value}
//     header={label}
//     onChange={(value) => {
//       onSelected && onSelected(value)
//       input.onChange(value)
//     }}
//     style={styles.item}
//     inputStyle={styles.input}
//     inputIconStyle={styles.inputIcon}
//     {...custom}
//   />
// )
