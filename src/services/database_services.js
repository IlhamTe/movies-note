import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native/Libraries/Alert/Alert';


export const saveMovie = async (newMapMovie) => {
  try {
    await AsyncStorage.setItem('dataMovies', JSON.stringify(newMapMovie));
  } catch (error) {
    Alert.alert('Gagal Menyimpan Movie', error.message);
  }
};

export const getMovies = async () => {
  try {
    const resultMovies = await AsyncStorage.getItem('dataMovies');
    return JSON.parse(resultMovies);
  } catch (error) {
    Alert.alert('Gagal Mendapatkan List Movies', error.message);
    return [];
  }
};
