
import { Button, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import styles from '../resources/styles'
import { getPlanets } from '../services'
import { setPlanets } from '../actions'
import { AppContext } from '../stores'

const PlanetScreen = () => {
    const { state, dispatch } = useContext(AppContext)
    const getPlanetName = async () => {
        const json = await getPlanets()
        if (json && Array.isArray(json)) {
            json.map(value => {
                value.isSelected = false
                return value
            })
            console.log('json', json)
            setPlanets(dispatch, json)
        }

    }
    useEffect(() => {
        getPlanetName()
    },[])
    return (
        <View style={styles.container}>

            <Text>PlanetScreen{state.planets.length}</Text>
        </View>
    )
}

export default PlanetScreen
