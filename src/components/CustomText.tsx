import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import styles from '../resources/styles';

interface Props {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
}
const CustomText = ({label, containerStyle}: Props) => {
  return (
    <View style={[customStyles.containerBorder, containerStyle]}>
      <Text style={customStyles.txtItem}>{label}</Text>
    </View>
  );
};
const customStyles = {...styles, txtItem: {padding: 10, textAlign: 'center'}};
export default CustomText;
