import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const CarForm = () => {
  const [carBrand, setCarBrand] = React.useState('');
  const [carModel, setCarModel] = React.useState('');
  const [carLicensePlate, setCarLicensePlate] = React.useState('');
  const [carOwnedDate, setCarOwnedDate] = React.useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [carBuildYear, setCarBuildYear] = React.useState('');
  const {colors} = useTheme();
  const styles = getStyles(colors);

  return (
    <View>
      <Text style={{textAlign: 'center'}}>Add your car</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCarBrand}
        value={carBrand}
        placeholder="Brand"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCarModel}
        value={carModel}
        placeholder="Model"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCarBuildYear}
        value={carBuildYear}
        placeholder="2000"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCarLicensePlate}
        value={carLicensePlate}
        placeholder="Model"
      />
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
  });

export default CarForm;
