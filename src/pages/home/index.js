import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EmptyMovies from '../../components/EmptyMovies';
import {saveMovie, getMovies} from '../../services/database_services';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';

export default function HomePage() {
  const [listMovies, setListMovies] = useState([]);
  const [filteredListMovies, setFilteredListMovies] = useState([]);

  const [visible, setVisible] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [descriptionMovie, setDescriptionMovie] = useState('');
  const [querySearch, setQuerySearch] = useState('');

  function handleShowDialog() {
    setVisible(true);
  }

  function handleHideDialog() {
    setVisible(false);
  }

  async function handleSaveMovie() {
    if (movieName !== '') {
      let listMoviesForSaveToSession = listMovies;
      const mapMovie = {
        movieName: movieName,
        description: descriptionMovie,
        watchingYear: new Date().getFullYear(),
      };
      listMoviesForSaveToSession.push(mapMovie);

      await saveMovie(listMoviesForSaveToSession);
      await getDataMovies();
      handleHideDialog();
    } else {
      Alert.alert('MOVIE NAME', 'Movie name cannot be empty!');
    }
  }

  async function getDataMovies() {
    const movies = await getMovies();
    if (movies !== null && movies.length > 0) {
      setListMovies(movies);
      setFilteredListMovies(movies);
    }
  }

  function handleSearchMovie(value) {
    if (value !== '') {
      setFilteredListMovies(
        listMovies.filter(m =>
          m.movieName.toLowerCase().includes(value.toLowerCase()),
        ),
      );
      console.log('query search', value);
    } else {
      setFilteredListMovies(listMovies);
    }
  }

  useEffect(() => {
    getDataMovies();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}>
      <StatusBar backgroundColor="purple" />

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          marginHorizontal: 0,
        }}>
        <Text style={{fontSize: 25, color: 'purple', fontWeight: 'bold'}}>
          Movies Note
        </Text>
      </View>

      {listMovies !== null && listMovies.length > 0 && (
        <View
          style={{
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search movie ..."
            style={{fontSize: 15}}
            onChangeText={value => handleSearchMovie(value)}
            underlineColorAndroid="rgba(132,4,132,0.3)"
          />
        </View>
      )}

      {listMovies.length === 0 ? (
        <EmptyMovies />
      ) : (
        <View style={{flex: 1, marginTop: 20}}>
          <FlatList
            data={filteredListMovies}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  elevation: 3,
                  marginBottom: 15,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'purple',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    {item.movieName.charAt(0)}
                  </Text>
                </View>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text
                    style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                    {item.movieName}
                  </Text>
                  <Text style={{marginTop: 2, fontSize: 15}}>
                    {item.description}
                  </Text>
                </View>

                <View
                  style={{
                    width: 50,
                    backgroundColor: 'purple',
                    paddingVertical: 2,
                    alignItems: 'center',
                    borderBottomLeftRadius: 7,
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    {item.watchingYear}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}

      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 30,
          right: 20,
          height: 70,
          backgroundColor: 'purple',
          borderRadius: 100,
        }}
        onPress={handleShowDialog}>
        <IonicIcon
          name="add-outline"
          size={35}
          color="white"
          style={{marginLeft: 2}}
        />
      </TouchableOpacity>

      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Add Movie</Dialog.Title>
          <Dialog.Input
            label="Movie Name"
            onChangeText={value => setMovieName(value)}
          />

          <Dialog.Input
            label="Description (optional)"
            onChangeText={value => setDescriptionMovie(value)}
          />

          <Dialog.Button
            label="Cancel"
            onPress={handleHideDialog}
            style={{color: 'purple'}}
          />
          <Dialog.Button
            label="ADD"
            onPress={handleSaveMovie}
            style={{color: 'purple'}}
          />
        </Dialog.Container>
      </View>
    </View>
  );
}
