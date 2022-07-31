import * as React from 'react';
import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FAB} from '@rneui/themed';
import {getAllCars} from '../services/CarsProvider';
import {ListItem} from '@rneui/themed';
const CarScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(true);
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
      <Text>TOP</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <FlatList
          data={cars}
          renderItem={({item}) => {
            return (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.brand}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
            );
          }}
          ListEmptyComponent={emptyListComponent}
          keyExtractor={car => car.id}
          extraData={cars}
        />
      )}
      <Text>BOTTOM</Text>
      <FAB
        visible={visible}
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color="#0e92ffff"
      />
    </View>
  );
};

export default CarScreen;
