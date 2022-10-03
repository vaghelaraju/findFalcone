import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

type Props = {};
type SS = {
  planetList: any;
  planetList1: any;
  planetList2: any;
  planetList3: any;
  planetList4: any;
  vehicleList: any;
  vehicleList1: any;
  vehicleList2: any;
  vehicleList3: any;
  vehicleList4: any;
};
export default class HomeScreen extends Component<Props, SS> {
  constructor(Props: Props) {
    super(Props);
    this.state = {
      planetList: [],
      planetList1: [],
      planetList2: [],
      planetList3: [],
      planetList4: [],
      vehicleList: [],
      vehicleList1: [],
      vehicleList2: [],
      vehicleList3: [],
      vehicleList4: [],
    };
  }

  componentDidMount() {
    console.log('didMount');

    this.getList();
    this.getVehicleList();
  }

  getList = async () => {
    try {
      const response = await fetch('https://findfalcone.herokuapp.com/planets');
      const json = await response.json();
      // if (Array.isArray(json)) {
      //   json.map(value => {
      //     value.isSelected = false;
      //     return value;
      //   });
      // }
      console.log('plnet:', json);

      this.setState({planetList: json, planetList1: json});
    } catch (error) {
      console.error(error);
    }
  };

  getVehicleList = async () => {
    try {
      const response = await fetch(
        'https://findfalcone.herokuapp.com/vehicles',
      );
      const json = await response.json();

      // if (Array.isArray(json)) {
      //   json.map(value => {
      //     value.isSelected = false;
      //     return value;
      //   });
      // }
      console.log('vehicle:', json);
      this.setState({vehicleList: json, vehicleList1: json});
    } catch (error) {
      console.error(error);
    }
  };
  //handling onPress action
  getListViewItem = (item: any) => {
    Alert.alert(item.key);
  };
  onItemPress = (item: any) => {
    console.log('item2', item);
    this.props.navigation.navigate('DisplayJson', {item: item});
  };
  renderPlanetItem = (item: any, position: number) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          console.log('item', item);
          this.onItemPress(item);
        }}>
        <View style={styles.item}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderVehicleItem = (item: any, position: number) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          console.log('item', item);
          this.onItemPress(item);
        }}>
        <View style={styles.item}>
          <Text>
            {item.name} ({item.total_no})
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.matchParent}>
          <View style={[styles.flex1, styles.row]}>
            <View style={[styles.flex1, styles.border]}>
              <FlatList
                horizontal={true}
                data={this.state.planetList}
                renderItem={({item}) => this.renderPlanetItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
              <FlatList
                data={this.state.vehicleList}
                renderItem={({item}) => this.renderVehicleItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
            </View>
            <View style={[styles.flex1, styles.border]}>
              <FlatList
                horizontal={true}
                data={this.state.planetList}
                renderItem={({item}) => this.renderPlanetItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
              <FlatList
                data={this.state.vehicleList}
                renderItem={({item}) => this.renderVehicleItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
            </View>
          </View>
          <View style={[styles.flex1, styles.row]}>
            <View style={[styles.flex1, styles.border]}>
              <FlatList
                horizontal={true}
                data={this.state.planetList}
                renderItem={({item}) => this.renderPlanetItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
              <FlatList
                data={this.state.vehicleList}
                renderItem={({item}) => this.renderVehicleItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
            </View>
            <View style={[styles.flex1,styles.border]}>
              <FlatList
                horizontal={true}
                data={this.state.planetList}
                renderItem={({item}) => this.renderPlanetItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
              <FlatList
                data={this.state.vehicleList}
                renderItem={({item}) => this.renderVehicleItem(item, 0)}
                onEndReachedThreshold={0.1}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '100%',
    padding: 10,
    fontSize: 18,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commonPadding: {
    paddingVertical: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  bgGreen: {
    backgroundColor: 'green',
  },
  matchParent: {
    height: '100%',
    width: '100%',
  },
  border: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 10,
  },
});
