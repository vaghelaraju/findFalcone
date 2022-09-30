import { SET_PLANETS, SET_VEHICLES } from "../constants/actionTypes";
import { IPlanets, IVehicles } from "../stores";
export interface IStates {
    planets: IPlanets[];
    vehicles: IVehicles[]
}
interface IActions {
    type: string;
    value: any;
}
export const initialState = {
    planets: [],
    vehicles: []
}
const reducer = (state: IStates = initialState, action: IActions) => {

    switch (action.type) {
        case SET_PLANETS:
            return { ...state, planets: action.value };
        case SET_VEHICLES:
            return { ...state, vehicles: action.value };

        default:
            return state;
    }
};

export default reducer