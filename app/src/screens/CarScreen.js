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
} from 'react-native';
import {FAB} from '@rneui/themed';
import {getAllCars} from '../services/CarsProvider';
import {Avatar, Card} from '@rneui/base';
import {useTheme} from '@react-navigation/native';
import CarForm from '../components/CarForm';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CarScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(true);
  const [carFormVisible, setCarFormVisible] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {colors} = useTheme();
  const styles = getCarStyles(colors);

  React.useEffect(() => {
    const fetchCars = async () => {
      const foundCars = await getAllCars();
      const carJson = await foundCars.json();
      setCars(carJson);
    };

    fetchCars()
      .catch(error => console.log(error))
      .finally(setIsLoading(false));
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
          renderItem={({item}) => {
            return (
              <Card containerStyle={styles.baseBackground}>
                <Card.Title style={styles.baseText}>
                  {item.brand} {item.model}
                </Card.Title>
                <Card.Divider />
                <View style={styles.cardContainer}>
                  <Ionicons name={'car-sport-outline'} size={80} color={"#0e92ffff"}/>
                  <View>
                    <Text style={styles.baseText}>
                      License plate: {item.licensePlateNumber}
                    </Text>
                    <Text style={styles.baseText}>
                      Build year: {item.buildYear}
                    </Text>
                  </View>
                </View>
              </Card>
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
        onPress={() => setCarFormVisible(true)}
      />

      <CarForm
      open={carFormVisible}
      onClose={() => setCarFormVisible(false)}
      intent="add"
      >
      </CarForm>

    </View>
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
