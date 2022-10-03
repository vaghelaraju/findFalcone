import { View, Text } from 'react-native'
import React from 'react'
import styles from '../resources/styles'
import colors from '../resources/colors'

interface Props {
    label: string
}
const CustomButton = ({ label }: Props) => {
    return (
        <View style={customStyles.containerButton}>
            <Text style={customStyles.txtItem}>{label}</Text>
        </View>
    )
}
const customStyles = { ...styles, txtItem: { padding: 10, textAlign: 'center', color: colors.white } }
export default CustomButton