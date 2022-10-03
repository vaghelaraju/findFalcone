
import { Button, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../resources/styles'
import { getPlanets, getVehicles } from '../services'
import { setPlanets, setVehicles } from '../actions'
import { AppContext, IPlanets, IVehicles } from '../stores'
import ModalDropdown from 'react-native-modal-dropdown';
import CustomText from '../components/CustomText'
import CustomButton from '../components/CustomButton'
const PlanetScreen = () => {
    const [planetNames, setPlanetNames] = useState([])
    const [planetOne, setPlanetOne] = useState("")
    const [planetTwo, setPlanetTwo] = useState("")
    const [planetThree, setPlanetThree] = useState("")
    const [planetFour, setPlanetFour] = useState("")
    const [vehicleNames, setVehicleNames] = useState([])
    const [vehicleOne, setVehicleOne] = useState("")
    const [vehicleTwo, setVehicleTwo] = useState("")
    const [vehicleThree, setVehicleThree] = useState("")
    const [vehicleFour, setVehicleFour] = useState("")
    const { state, dispatch } = useContext(AppContext)

    const getPlanetName = async () => {
        const json = await getPlanets()
        if (json && Array.isArray(json)) {
            json.map(value => {
                value.isSelected = false
                return value
            })

            setPlanets(dispatch, json)
            setPlanetNames([...json].map((value: IPlanets) => { return value.name }))
        }

    }
    const getVehicleName = async () => {
        const json = await getVehicles()
        if (json && Array.isArray(json)) {
            json.map(value => {
                value.isSelected = false
                return value
            })

            setVehicles(dispatch, json)
            setVehicleNames([...json].map((value: IVehicles) => { return `${value.name}(${value.total_no})` }))
        }
    }
    const planetSelection = () => {
        const vehicleOne: IVehicles = state.vehicles.find((value: IVehicles) => value.name == vehicleOne);

    }
    const vehicleSelection = () => {
        const vehicleOne: IVehicles = state.vehicles.find((value: IVehicles) => value.name == vehicleOne);

    }
    const doFindFalcone = () => { }
    useEffect(() => {
        getPlanetName()
        getVehicleName()
    }, [])
    return (
        <View style={customStyles.container}>
            <View style={[customStyles.viewFlex, customStyles.viewRow, { marginHorizontal: 5 }]}>
                <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
                    <ModalDropdown options={planetNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setPlanetOne(planetNames[index])
                    }}>
                        <CustomText label={planetOne.length > 0 ? planetOne : "Select Planet"} /></ModalDropdown>
                    <ModalDropdown options={vehicleNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setVehicleOne(vehicleNames[index])
                    }}>
                        <CustomText label={vehicleOne.length > 0 ? vehicleOne : "Select Vehicle"} /></ModalDropdown>
                </View>

                <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
                    <ModalDropdown options={planetNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setPlanetTwo(planetNames[index])
                    }}>
                        <CustomText label={planetTwo.length > 0 ? planetTwo : "Select Planet"} /></ModalDropdown>
                    <ModalDropdown options={vehicleNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setVehicleTwo(vehicleNames[index])
                    }}>
                        <CustomText label={vehicleTwo.length > 0 ? vehicleTwo : "Select Vehicle"} /></ModalDropdown>
                </View>
            </View>
            <View style={[customStyles.viewFlex, customStyles.viewRow, { marginHorizontal: 5 }]}>
                <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
                    <ModalDropdown options={planetNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setPlanetThree(planetNames[index])
                    }}>
                        <CustomText label={planetThree.length > 0 ? planetThree : "Select Planet"} /></ModalDropdown>
                    <ModalDropdown options={vehicleNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setVehicleThree(vehicleNames[index])
                    }}>
                        <CustomText label={vehicleThree.length > 0 ? vehicleThree : "Select Vehicle"} /></ModalDropdown>
                </View>
                <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
                    <ModalDropdown options={planetNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setPlanetFour(planetNames[index])
                    }}>
                        <CustomText label={planetFour.length > 0 ? planetFour : "Select Planet"} /></ModalDropdown>
                    <ModalDropdown options={vehicleNames} multipleSelect={false} textStyle={customStyles.containerModalText} onSelect={index => {
                        setVehicleFour(vehicleNames[index])
                    }}>
                        <CustomText label={vehicleFour.length > 0 ? vehicleFour : "Select Vehicle"} /></ModalDropdown>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => doFindFalcone()}><CustomButton label='Finding Falcone' /></TouchableOpacity>
        </View >
    )
}
const customStyles = { ...styles, containerModalText: { fontWeight: 'bold', color: "black", padding: 10 } }

export default PlanetScreen
