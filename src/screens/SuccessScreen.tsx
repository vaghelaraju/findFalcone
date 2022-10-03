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
  route: any;
}
interface States {
  timeDuration: number;
  planetFound: string;
  status: string;
}
class SuccessScreen extends PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timeDuration: 0,
      planetFound: '',
      status: '',
    };
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.doHome()}>
          <CustomButton label="Home" />
        </TouchableOpacity>
      ),
    });
  }
  componentDidMount(): void {
    const {timeDuration, planetFound, status} = this.props.route.params;
    this.setState({
      timeDuration: timeDuration,
      planetFound: planetFound,
      status: status,
    });
  }
  doHome = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    const {timeDuration, planetFound, status} = this.state;
    return (
      <View style={customStyles.container}>
        <CustomText
          label={
            status === 'success'
              ? `Success! Congratulations on Finding Falcone. Kind Shan is mighty pleased.`
              : 'Oh! Sorry Queen Al Falcone not available'
          }
          containerStyle={{
            marginHorizontal: 10,
            alignItems: 'flex-end',
            borderWidth: 0,
          }}
        />
        {status === 'success' ? (
          <CustomText
            label={`Time Taken : ${timeDuration}`}
            containerStyle={{
              marginHorizontal: 10,
              alignItems: 'center',
              borderWidth: 0,
            }}
          />
        ) : null}
        {status === 'success' ? (
          <CustomText
            label={`Planet Found : ${planetFound}`}
            containerStyle={{
              marginHorizontal: 10,
              alignItems: 'center',
              borderWidth: 0,
            }}
          />
        ) : null}
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
export default SuccessScreen;
