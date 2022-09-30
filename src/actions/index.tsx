import { useContext, useReducer } from "react";
import { SET_PLANETS, SET_VEHICLES } from "../constants/actionTypes";
import reducer, { initialState } from "../reducers";
import { IPlanets, IVehicles } from "../stores";

export const setPlanets = (dispatch: any, planets: IPlanets[]) => {

    dispatch({ type: SET_PLANETS, value: planets })
}

export const setVehicles = (vehicles: IVehicles[]) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    dispatch({ type: SET_VEHICLES, value: vehicles })
}