import * as React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/placeholder.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper'
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/placeholder.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper'
        }
      ]}
    />
  );
};

export default OnboardingScreen;