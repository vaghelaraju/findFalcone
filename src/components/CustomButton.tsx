import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import styles from '../resources/styles';
import colors from '../resources/colors';

interface Props {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
const CustomButton = ({label, labelStyle, containerStyle}: Props) => {
  return (
    <View style={[customStyles.containerButton, containerStyle]}>
      <Text style={[customStyles.txtItem, labelStyle]}>{label}</Text>
    </View>
  );
};
const customStyles = {
  ...styles,
  txtItem: {padding: 10, textAlign: 'center', color: colors.white},
};
export default CustomButton;
