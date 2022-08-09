import {useFocusEffect, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Card, FAB} from '@rneui/themed';
import * as React from 'react';
import {} from 'react-native';
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import CommuteRegistrationDetail from '../components/CommuteRegistrationDetail';
import CommuteRegistrationForm from '../components/CommuteRegistrationForm';
import {getAllCommuteRegistrationsByCarId} from '../services/CommuteService';
import {storage} from '../services/StorageProvider';

const Stack = createNativeStackNavigator();

const CommuteRegistrationsList = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [commuteRegistrations, setCommuteRegistrations] = React.useState([]);
  const [selectedCarId, setSelectedCarId] = React.useState('');
  const {colors} = useTheme();
  let refreshing = false;

  const fetchCommutesByCarId = async (carId: string) => {
    const foundCommutes = await getAllCommuteRegistrationsByCarId(carId);
    const commuteRegistrationsJson = await foundCommutes.json();
    setCommuteRegistrations(commuteRegistrationsJson);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      fetchCommutesByCarId(storage.getString('selectedCarId'));

      return () => {
        isActive = false;
      };
    }, []),
  );

  React.useEffect(() => {
    setSelectedCarId(storage.getString('selectedCarId'));
    fetchCommutesByCarId(storage.getString('selectedCarId'))
      .catch(error => console.log(error))
      .finally(setIsLoading(false));
  }, []);

  const emptyListComponent = () => <Text>No registered commutes yet..</Text>;
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <FlatList
          data={commuteRegistrations}
          refreshing={refreshing}
          onRefresh={() => {
            fetchCommutesByCarId();
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity key={item.id}>
                <Card></Card>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={emptyListComponent}
          keyExtractor={commute => commute.id}
          extraData={commuteRegistrations}
        />
      )}
      <FAB
        visible={true}
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color="#0e92ff"
        onPress={() => navigation.navigate('CommuteRegistrationForm', {modalType: 'add'})}
      />
    </View>
  );
};

const CommuteRegistrationScreen = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Commute Registrations">
      <Stack.Screen
        options={{headerShown: false}}
        name="Commute Registrations"
        component={CommuteRegistrationsList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Commute Registration Details"
        component={CommuteRegistrationDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Commute Registration Form"
        component={CommuteRegistrationForm}
      />
    </Stack.Navigator>
  );
};

export default CommuteRegistrationScreen;
