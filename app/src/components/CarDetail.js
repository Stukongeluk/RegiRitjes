import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getCarById} from '../services/CarsProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from '@rneui/themed';

const CarDetail = ({route, navigation}) => {
  const [car, setCar] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const {carId, otherParam} = route.params;
  const {colors} = useTheme();
  const styles = getStyles(colors);

  React.useEffect(() => {
    const fetchCar = async () => {
      const foundCar = await getCarById(carId);
      const carJson = await foundCar.json();
      setCar(carJson);
      console.log(carJson);
    };

    fetchCar()
      .catch(error => console.log(error))
      .finally(setIsLoading(false));
  }, {});

  return isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <View>
      <Ionicons name={'car-sport-outline'} size={200} color={'#0e92ffff'} style={{alignSelf:'center'}}/>
    <Card containerStyle={styles.baseBackground}>
        <Card.Title>{car.brand} {car.model}</Card.Title>
        <Card.Divider></Card.Divider>
        <Card.FeaturedSubtitle>License plate: {car.licensePlateNumber}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Owned since: {car.ownedDate}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>End date: {car.endDate}</Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle>Build year: {car.buildYear}</Card.FeaturedSubtitle>

    </Card>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    baseBackground: {
        backgroundColor: colors.backgroundColor,
      },
  });

export default CarDetail;
