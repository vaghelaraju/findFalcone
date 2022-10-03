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
  selectedVehicles: IVehicles[];
  timeDuration: number;
  planetOne: IPlanets | undefined;
  planetTwo: IPlanets | undefined;
  planetThree: IPlanets | undefined;
  planetFour: IPlanets | undefined;
  vehicleOne: IVehicles | undefined;
  vehicleTwo: IVehicles | undefined;
  vehicleThree: IVehicles | undefined;
  vehicleFour: IVehicles | undefined;
  isLoading: boolean;
}
class PlanetScreen extends PureComponent<Props, States> {
  static contextType?: React.Context<IContextType> | undefined = AppContext;
  declare context: IContextType;
  constructor(props: Props) {
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      selectedVehicles: [],
      timeDuration: 0,
      planetOne: undefined,
      planetTwo: undefined,
      planetThree: undefined,
      planetFour: undefined,
      vehicleOne: undefined,
      vehicleTwo: undefined,
      vehicleThree: undefined,
      vehicleFour: undefined,
      isLoading: false,
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
  doUpdateVehicle = (option: IVehicles) => {
    const {vehicles, selectedVehicles} = this.state;
    if (
      vehicles.filter(value => {
        return value.isSelected;
      }).length <= 4
    ) {
      const copiedVehicles = [...selectedVehicles];
      const copiedData = [...vehicles].map((value: IVehicles, idx: number) => {
        let newItem: IVehicles = Object.assign({}, value);
        if (value.name === option.name && !option.isSelected) {
          newItem.isSelected = true;
          newItem.total_no = newItem.total_no - 1;
          copiedVehicles.push(newItem);
        } else if (value.name === option.name && option.isSelected) {
          newItem.total_no = newItem.total_no - 1;
          copiedVehicles.push(newItem);
        }
        return newItem;
      });

      this.setState(
        {vehicles: copiedData, selectedVehicles: copiedVehicles},
        () => {
          this.doCalculateTime();
        },
      );
    }
  };
  doFindFalcone = async () => {
    this.setState({isLoading: true});
    let token = await getToken();
    console.log('token', token);
    const {planets, selectedVehicles} = this.state;
    if (token) {
      let data = {
        token: token.token,
        planet_names: planets
          .filter(value => value.isSelected)
          .map(value => {
            return value.name;
          }),
        vehicle_names: selectedVehicles
          .filter(value => value.isSelected)
          .map(value => {
            return value.name;
          }),
      };
      console.log('data', data);
      let result = await doFineFalCone(data);
      console.log('result', result);
      if (result) {
        const {status, planet_name} = result;
        this.props.navigation.navigate('Success', {
          timeDuration: this.state.timeDuration,
          planetFound: planet_name ? planet_name : '',
          status: status,
        });
      }
      this.setState({isLoading: false});
    }
  };
  doCalculateTime = () => {
    let distance1 = this.state.planetOne?.distance;
    let distance2 = this.state.planetTwo?.distance;
    let distance3 = this.state.planetThree?.distance;
    let distance4 = this.state.planetFour?.distance;
    let speed1 = this.state.vehicleOne?.speed;
    let speed2 = this.state.vehicleTwo?.speed;
    let speed3 = this.state.vehicleThree?.speed;
    let speed4 = this.state.vehicleFour?.speed;
    let timeDuration = 0;
    if (this.state.vehicleOne) {
      timeDuration = timeDuration + calculateTime(distance1, speed1);
    }
    if (this.state.vehicleTwo) {
      timeDuration = timeDuration + calculateTime(distance2, speed2);
    }
    if (this.state.vehicleThree) {
      timeDuration = timeDuration + calculateTime(distance3, speed3);
    }
    if (this.state.vehicleFour) {
      timeDuration = timeDuration + calculateTime(distance4, speed4);
    }
    console.log('timeDuration', timeDuration);
    this.setState({timeDuration: timeDuration});
  };
  doReset = () => {
    this.setState({
      planets: this.context.state.planets,
      vehicles: this.context.state.vehicles,
      planetOne: undefined,
      planetTwo: undefined,
      planetThree: undefined,
      planetFour: undefined,
      vehicleOne: undefined,
      vehicleTwo: undefined,
      vehicleThree: undefined,
      vehicleFour: undefined,
      selectedVehicles: [],
      timeDuration: 0,
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
              dropdownTextProps={{testID: '1'}}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}
              disabled={this.state.planetOne != undefined}>
              <CustomText
                label={planetOne ? planetOne.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles.filter(value => {
                return (
                  this.state.planetOne?.distance <= value.max_distance &&
                  value.total_no > 0
                );
              })}
              dropdownTextProps={{testID: '2'}}
              multipleSelect={false}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetOne) {
                  this.setState({vehicleOne: option});
                  this.doUpdateVehicle(option);
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}
              disabled={this.state.vehicleOne != undefined}>
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
              dropdownTextProps={{testID: '3'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetTwo: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}
              disabled={this.state.planetTwo != undefined}>
              <CustomText
                label={planetTwo ? planetTwo.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles.filter(value => {
                return (
                  this.state.planetTwo?.distance <= value.max_distance &&
                  value.total_no > 0
                );
              })}
              multipleSelect={false}
              dropdownTextProps={{testID: '4'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetTwo) {
                  this.setState({vehicleTwo: option});
                  this.doUpdateVehicle(option);
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}
              disabled={this.state.vehicleTwo != undefined}>
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
              dropdownTextProps={{testID: '5'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetThree: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}
              disabled={this.state.planetThree != undefined}>
              <CustomText
                label={planetThree ? planetThree.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles.filter(value => {
                return (
                  this.state.planetThree?.distance <= value.max_distance &&
                  value.total_no > 0
                );
              })}
              multipleSelect={false}
              dropdownTextProps={{testID: '6'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetThree) {
                  this.setState({vehicleThree: option});
                  this.doUpdateVehicle(option);
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}
              disabled={this.state.vehicleThree != undefined}>
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
              dropdownTextProps={{testID: '7'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                this.setState({planetFour: option});
                this.doUpdatePlanets(option);
              }}
              renderRowText={(a: IPlanets) => {
                return a.name;
              }}
              disabled={this.state.planetFour != undefined}>
              <CustomText
                label={planetFour ? planetFour.name : 'Select Planet'}
              />
            </ModalDropdown>
            <ModalDropdown
              options={this.state.vehicles.filter(value => {
                return (
                  this.state.planetFour?.distance <= value.max_distance &&
                  value.total_no > 0
                );
              })}
              multipleSelect={false}
              dropdownTextProps={{testID: '8'}}
              textStyle={customStyles.containerModalText}
              onSelect={(index, option) => {
                if (planetFour) {
                  this.setState({vehicleFour: option});
                  this.doUpdateVehicle(option);
                } else {
                  Alert.alert('Error', 'Please select Planet');
                }
              }}
              renderRowText={(a: IVehicles) => {
                return `${a.name}(${a.total_no})`;
              }}
              disabled={this.state.vehicleFour != undefined}>
              <CustomText
                label={vehicleFour ? vehicleFour.name : 'Select Vehicle'}
              />
            </ModalDropdown>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.doFindFalcone()}>
          <CustomButton
            label="Finding Falcone"
            isLoading={this.state.isLoading}
          />
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
