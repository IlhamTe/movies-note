import { View, Text } from 'react-native'
import React from 'react'
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function EmptyMovies() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <IonicIcon name='film-outline' color='black' size={50}/>
        <Text style={{fontSize:16}}>Belum ada catatan film</Text>
      </View>
  )
}