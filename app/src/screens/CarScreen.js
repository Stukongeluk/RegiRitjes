import * as React from 'react';
import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {FAB} from '@rneui/themed';
import {getAllCars} from '../services/CarService';
import {Avatar, Card} from '@rneui/base';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import CarForm from '../components/CarForm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarDetail from '../components/CarDetail';
import {storage} from '../services/StorageProvider';

const Stack = createNativeStackNavigator();

const CarList = ({navigation}) => {
  const [visible, setVisible] = React.useState(true);
  const [carFormVisible, setCarFormVisible] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {colors} = useTheme();
  const [selectedCar, setSelectedCar] = React.useState(null);
  const styles = getCarStyles(colors);
  let refreshing = false;

  const fetchCars = async () => {
    const foundCars = await getAllCars();
    const carJson = await foundCars.json();
    setCars(carJson);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchCars();
      setSelectedCar(storage.getString('selectedCarId'));

      return () => {
        isActive = false;
      };
    }, []),
  );

  React.useEffect(() => {
    fetchCars()
      .catch(error => console.log(error))
      .finally(setIsLoading(false));

    setSelectedCar(storage.getString('selectedCarId'));
  }, []);

  const emptyListComponent = () => (
    <Text>Please add your car. It's rather empty now..</Text>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <FlatList
          data={cars}
          refreshing={refreshing}
          onRefresh={() => {
            fetchCars();
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('CarDetail', {carId: item.id})
                }
                onLongPress={() => {
                  storage.set('selectedCarId', String(item.id));
                  setSelectedCar(storage.getString('selectedCarId'));
                }
                }>
                <Card
                  containerStyle={styles.baseBackground}
                  pointerEvents="none">
                  <Card.Title style={styles.baseText}>
                    {item.brand} {item.model}
                  </Card.Title>
                  <Card.Divider />
                  <View style={styles.cardContainer}>
                    <Ionicons
                      name={'car-sport-outline'}
                      size={80}
                      color={selectedCar === item.id ? '#0e92ffff' : 'grey'}
                    />
                    <View>
                      <Text style={styles.baseText}>
                        License plate: {item.licensePlateNumber}
                      </Text>
                      <Text style={styles.baseText}>
                        Build year: {item.buildYear}
                      </Text>
                      {selectedCar === item.id ? (
                        <Text>Active</Text>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={emptyListComponent}
          keyExtractor={car => car.id}
          extraData={cars}
        />
      )}
      <FAB
        visible={visible}
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color="#0e92ff"
        onPress={() => navigation.navigate('Carform', {modalType: 'add'})}
      />
    </View>
  );
};

const CarScreen = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="CarList">
      <Stack.Screen
        options={{headerShown: false}}
        name="CarList"
        component={CarList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CarDetail"
        component={CarDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Carform"
        component={CarForm}
      />
    </Stack.Navigator>
  );
};

const getCarStyles = (colors: any) =>
  StyleSheet.create({
    baseBackground: {
      backgroundColor: colors.backgroundColor,
    },
    cardContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.backgroundColor,
    },
    baseText: {
      fontFamily: 'Cochin',
      color: colors.text,
    },
  });

export default CarScreen;
