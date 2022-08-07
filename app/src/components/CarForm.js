import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {saveCar, updateCar} from '../services/CarService';
import DatePicker from 'react-native-date-picker';
import {color, set} from 'react-native-reanimated';
import {storage} from '../services/StorageProvider';

const CarForm = ({route, navigation}) => {
  const {modalType, car} = route.params;
  const [carBrand, setCarBrand] = React.useState('');
  const [carModel, setCarModel] = React.useState('');
  const [carLicensePlate, setCarLicensePlate] = React.useState('');
  const [carOwnedDate, setCarOwnedDate] = React.useState(new Date());
  const [carEndDate, setCarEndDate] = React.useState(new Date('2100-01-01'));
  const [datePickerOwnedDateOpen, setDatePickerOwnedDateOpen] =
    React.useState(false);
  const [datePickerEndDateOpen, setDatePickerEndDateOpen] =
    React.useState(false);
  const [carBuildYear, setCarBuildYear] = React.useState('');
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const saveCarFromForm = async carRequest => {
    const savedCar = await saveCar(carRequest);
    const savedCarJson = await savedCar.json();
    storage.set('selectedCarId', String(savedCarJson.id));
  };

  const updateCarFromForm = async carRequest => {
    await updateCar(car.id, carRequest);
  };

  React.useEffect(() => {
    if (modalType === 'update') {
      setCarBrand(car.brand);
      setCarModel(car.model);
      setCarLicensePlate(car.licensePlateNumber);
      setCarOwnedDate(new Date(car.ownedDate));
      setCarBuildYear(car.buildYear);
      setCarEndDate(new Date(car.endDate));
    }
  }, []);

  let operation = modalType;

  return (
    <View>
      <Text style={{textAlign: 'center'}}>{operation} your car</Text>
      <Text>Car brand</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCarBrand}
        value={carBrand}
        placeholder="Brand"
      />
      <Text>Car model</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCarModel}
        value={carModel}
        placeholder="Model"
      />
      <Text>Build year</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCarBuildYear}
        value={carBuildYear}
        placeholder="2000"
        keyboardType="numeric"
      />
      <Text>License plate</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCarLicensePlate}
        value={carLicensePlate}
        placeholder="Model"
      />
      <Text>Owned date</Text>
      <TouchableOpacity
        onPress={() => {
          setDatePickerOwnedDateOpen(true);
        }}>
        <Text style={styles.dateInput}>
          {carOwnedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={datePickerOwnedDateOpen}
        date={carOwnedDate}
        onConfirm={date => {
          setDatePickerOwnedDateOpen(false);
          setCarOwnedDate(date);
        }}
        onCancel={() => {
          setDatePickerOwnedDateOpen(false);
        }}
      />
      <Text>End date</Text>
      <TouchableOpacity
        onPress={() => {
          setDatePickerEndDateOpen(true);
        }}>
        <Text style={styles.dateInput}>{carEndDate.toISOString()}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={datePickerEndDateOpen}
        date={carEndDate}
        onConfirm={date => {
          setDatePickerEndDateOpen(false);
          setCarEndDate(date);
        }}
        onCancel={() => {
          setDatePickerEndDateOpen(false);
        }}
      />
      {modalType === 'update' ? (
        <Button
          title="Update"
          onPress={() => {
            updateCarFromForm({
              brand: carBrand,
              model: carModel,
              licensePlateNumber: carLicensePlate,
              ownedDate: carOwnedDate.toISOString(),
              endDate: carEndDate.toISOString(),
              buildYear: carBuildYear,
            });
            navigation.pop();
          }}
        />
      ) : (
        <Button
          title="Add new car"
          onPress={() => {
            saveCarFromForm({
              brand: carBrand,
              model: carModel,
              licensePlateNumber: carLicensePlate,
              ownedDate: carOwnedDate.toISOString(),
              endDate: carEndDate.toISOString(),
              buildYear: carBuildYear,
            });
            navigation.pop();
          }}
        />
      )}
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    input: {
      width: '80%',
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    dateInput: {
      paddingLeft: 20,
      paddingTop: 20,
      paddingBottom: 20,
      color: colors.text,
    },
  });

export default CarForm;
