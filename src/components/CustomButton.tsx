import { View, Text } from 'react-native'
import React from 'react'
import styles from '../resources/styles'

interface Props {
    label: string
}
const CustomButton = ({ label }: Props) => {
    return (
        <View style={customStyles.containerBorder}>
            <Text style={customStyles.txtItem}>{label}</Text>
        </View>
    )
}
const customStyles = { ...styles, txtItem: { padding: 10, textAlign: 'center' } }
export default CustomButton