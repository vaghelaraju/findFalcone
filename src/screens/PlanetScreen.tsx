import {View, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {PureComponent} from 'react';
import styles from '../resources/styles';
import {doFineFalCone, getPlanets, getToken, getVehicles} from '../services';
import {setPlanets, setVehicles} from '../actions';
import {AppContext, IContextType, IPlanets, IVehicles} from '../stores';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import colors from '../resources/colors';
import {calculateTime} from '../utils/Util';
interface Props {
  navigation: any;
}
interface States {
  planets: IPlanets[];
  vehicles: IVehicles[];
  timeDuration: number;
  planetOne: IPlanets | undefined;
  planetTwo: IPlanets | undefined;
  planetThree: IPlanets | undefined;
  planetFour: IPlanets | undefined;
  vehicleOne: IVehicles | undefined;
  vehicleTwo: IVehicles | undefined;
  vehicleThree: IVehicles | undefined;
  vehicleFour: IVehicles | undefined;
}
class PlanetScreen extends PureComponent<Props, States> {
  static contextType?: React.Context<IContextType> | undefined = AppContext;
  declare context: IContextType;
  constructor(props: Props) {
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      timeDuration: 0,
      planetOne: undefined,
      planetTwo: undefined,
      planetThree: undefined,
      planetFour: undefined,
      vehicleOne: undefined,
      vehicleTwo: undefined,
      vehicleThree: undefined,
      vehicleFour: undefined,
    };
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.doReset()}>
          <CustomButton label="Reset" />
        </TouchableOpacity>
      ),
    });
  }
  componentDidMount(): void {
    this.getPlanetName();
    this.getVehicleName();
  }
  getPlanetName = async () => {
    const json = await getPlanets();
    if (json && Array.isArray(json)) {
      json.map(value => {
        value.isSelected = false;
        return value;
      });

      setPlanets(this.context.dispatch, json);
      this.setState({planets: json});
    }
  };
  getVehicleName = async () => {
    const json = await getVehicles();
    if (json && Array.isArray(json)) {
      json.map((value: IVehicles) => {
        value.isSelected = false;
        value.label = `${value.name}(${value.total_no})`;
        return value;
      });

      setVehicles(this.context.dispatch, json);
      this.setState({vehicles: json});
    }
  };
  doCheckPlanet = (index: number) => {
    let isSelected = [...this.state.planets][index].isSelected;
    return isSelected;
  };
  doCheckVehicle = (index: number) => {
    let isSelected = [...this.state.vehicles][index].isSelected;
    return isSelected;
  };
  doUpdatePlanets = (option: IPlanets) => {
    console.log('option', option);
    const {planets} = this.state;
    if (
      planets.filter(value => {
        return value.isSelected;
      }).length <= 4
    ) {
      const copiedData = [...planets].map((value: IPlanets, idx: number) => {
        let newItem: IPlanets = Object.assign({}, value);
        if (value.name === option.name && !option.isSelected) {
          newItem.isSelected = true;
        } else if (value.name === option.name && option.isSelected) {
          newItem.isSelected = false;
        }
        return newItem;
      });

      this.setState({planets: copiedData});
    }
  };
  doUpdateVehicle = (index: number) => {
    const {vehicles} = this.state;
    if (
      vehicles.filter(value => {
        return value.isSelected;
      }).length <= 4
    ) {
      const copiedData = [...vehicles].map((value: IVehicles, idx: number) => {
        let newItem: IVehicles = Object.assign({}, value);
        if (idx === index) {
          newItem.isSelected = !newItem.isSelected;
        }
        return newItem;
      });

      this.setState({vehicles: copiedData});
    }
  };
  doFindFalcone = async () => {
    let token = await getToken();
    console.log('token', token);
    const {planets, vehicles} = this.state;
    if (token) {
      let data = {
        token: token.token,
        planet_names: planets
          .filter(value => value.isSelected)
          .map(value => {
            return value.name;
          }),
        vehicle_names: vehicles
          .filter(value => value.isSelected)
          .map(value => {
            return value.name;
          }),
      };
      console.log('data', data);
      let result = await doFineFalCone(data);
      console.log('result', result);
    }
  };
  doReset = () => {
    const copiedData = [...this.state.planets].map(
      (value: IPlanets, idx: number) => {
        let newItem: IPlanets = Object.assign({}, value);
        newItem.isSelected = false;
        return newItem;
      },
    );

    this.setState({
      planets: copiedData,
      planetOne: undefined,
      planetTwo: undefined,
      planetThree: undefined,
      planetFour: undefined,
      vehicleOne: undefined,
      vehicleTwo: undefined,
      vehicleThree: undefined,
      vehicleFour: undefined,
    });
  };
  render() {
    const {
      timeDuration,
      planetOne,
      planetTwo,
      planetThree,
      planetFour,
      vehicleOne,
      vehicleTwo,
      vehicleThree,
      vehicleFour,
    } = this.state;

    let updatedPlanets = this.state.planets;
    console.log('planets', updatedPlanets);
    return (
      <View style={customStyles.container}>
        <CustomText
          label={`Time Taken : ${timeDuration}`}
          containerStyle={{
            marginHorizontal: 10,
            alignItems: 'flex-end',
            borderWidth: 0,
          }}
        />
        <View
          style={[
            customStyles.viewFlex,
            customStyles.viewRow,
            {marginHorizontal: 5},
          ]}>
          <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
            <ModalDropdown
              options={updatedPlanets.filter(value => {
                return !value.isSelected || value.name === planetOne?.name;
              })}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.doUpdatePlanets(option);
                this.setState({planetOne: option});
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}>
              <CustomText
                label={planetOne ? planetOne.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetOne) {
                  this.setState({vehicleOne: option});
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}>
              <CustomText
                label={vehicleOne ? vehicleOne.name : 'Select Vehicle'}
              />
            </ModalDropdown>
          </View>

          <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
            <ModalDropdown
              options={updatedPlanets.filter(value => {
                return !value.isSelected || value.name === planetTwo?.name;
              })}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetTwo: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}>
              <CustomText
                label={planetTwo ? planetTwo.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetTwo) {
                  this.setState({vehicleTwo: option});
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}>
              <CustomText
                label={vehicleTwo ? vehicleTwo.name : 'Select Vehicle'}
              />
            </ModalDropdown>
          </View>
        </View>
        <View
          style={[
            customStyles.viewFlex,
            customStyles.viewRow,
            {marginHorizontal: 5},
          ]}>
          <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
            <ModalDropdown
              options={updatedPlanets.filter(value => {
                return !value.isSelected || value.name === planetThree?.name;
              })}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetThree: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}>
              <CustomText
                label={planetThree ? planetThree.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetThree) {
                  this.setState({vehicleThree: option});
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}>
              <CustomText
                label={vehicleThree ? vehicleThree.name : 'Select Vehicle'}
              />
            </ModalDropdown>
          </View>
          <View style={[customStyles.viewFlex, customStyles.containerBorder]}>
            <ModalDropdown
              options={updatedPlanets.filter(value => {
                return !value.isSelected || value.name === planetFour?.name;
              })}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetFour: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}>
              <CustomText
                label={planetFour ? planetFour.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetFour) {
                  this.setState({vehicleFour: option});
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}>
              <CustomText
                label={vehicleFour ? vehicleFour.name : 'Select Vehicle'}
              />
            </ModalDropdown>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.doFindFalcone()}>
          <CustomButton label="Finding Falcone" />
        </TouchableOpacity>
        <SafeAreaView style={{backgroundColor: colors.gray}}>
          <CustomButton
            label="Coding problem finding-falcone"
            containerStyle={customStyles.containerFooter}
          />
        </SafeAreaView>
      </View>
    );
  }
}
const customStyles = {
  ...styles,
  containerModalText: {fontWeight: 'bold', color: 'black', padding: 10},
  containerFooter: {
    backgroundColor: colors.gray,
    marginHorizontal: 0,
    borderRadius: 0,
  },
};

export default PlanetScreen;
