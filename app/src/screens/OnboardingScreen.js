import * as React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { storage } from '../services/StorageProvider';

const OnboardingScreen = ({ navigation }) => {
  const setDone = (navigation) => {
    storage.set('onboarded', true);
    navigation.dispatch(StackActions.replace('Home'));
  }

  return (
    <Onboarding
      onSkip={() => {
        setDone(navigation);
      }}
      onDone={() => {
        setDone(navigation);

      }}
      pages={[
        {
          backgroundColor: '#212121',
          image: (
            <Image source={require('../assets/images/regiritjesLogo.png')} />
          ),
          title: 'Welcome!',
          subtitle: 'All your registered commutes in one place. Easy and fun to use!',
        },
        {
          backgroundColor: '#212121',
          image: <Image source={require('../assets/images/addCar.png')} />,
          title: 'Car',
          subtitle: 'Add the car(s) you want to register your commutes for.',
        },
        {
          backgroundColor: '#212121',
          image: <Image source={require('../assets/images/register.png')} />,
          title: 'Register',
          subtitle: 'Keep track of all your commutes easily by registering them here.',
        },
        {
          backgroundColor: '#212121',
          image: <Image source={require('../assets/images/export.png')} />,
          title: 'Export',
          subtitle: 'Export your data when needed.',
        },
        {
          backgroundColor: '#212121',
          image: (
            <Image source={require('../assets/images/regiritjesLogo.png')} />
          ),
          title: 'Let\'s get started!',
          subtitle: '',
        },
      ]}
    />
  );
};

export default OnboardingScreen;