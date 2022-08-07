import {useTheme, useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getCarById, deleteCar} from '../services/CarService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from '@rneui/themed';

const CarDetail = ({route, navigation}) => {
  const [car, setCar] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const {carId, otherParam} = route.params;
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const fetchCar = async () => {
    const foundCar = await getCarById(carId);
    const carJson = await foundCar.json();
    setCar(carJson);
  };

  const removeCar = async () => {
    const deletedCarId = await deleteCar(carId);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchCar();

      return () => {
        isActive = false;
      };
    }, []),
  );

  React.useEffect(() => {
    fetchCar()
      .catch(error => console.log(error))
      .finally(setIsLoading(false));
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <View>
      <Ionicons
        name={'car-sport-outline'}
        size={200}
        color={'#0e92ffff'}
        style={{alignSelf: 'center'}}
      />
      <Card containerStyle={styles.baseBackground}>
        <Card.Title>
          {car.brand} {car.model}
        </Card.Title>
        <Card.Divider></Card.Divider>
        <Card.FeaturedSubtitle>
          License plate: {car.licensePlateNumber}
        </Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>
          Owned since: {car.ownedDate}
        </Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>End date: {car.endDate}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>
          Build year: {car.buildYear}
        </Card.FeaturedSubtitle>
      </Card>
      <Button
        style={styles.buttonStyle}
        title="Edit"
        onPress={() => {
          navigation.navigate('Carform', {modalType: 'update', car: car});
        }}
      />
      <Button
        style={styles.buttonStyle}
        title="Delete"
        color={'red'}
        onPress={() => {
          removeCar();
          navigation.pop();
        }}
      />
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    baseBackground: {
      backgroundColor: colors.backgroundColor,
    },
    buttonStyle: {
      width: '90%',
      marginTop: 10,
    },
  });

export default CarDetail;
