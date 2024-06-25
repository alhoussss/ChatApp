import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import {
  getAuth,
  signOut,
  collection,
  getFirestore,
  onSnapshot,
} from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  
  const signOutUser = () => {
    signOut(auth).then(() => navigation.replace('Login'));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
      setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe; 
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Discussions',
      headerStyle: { backgroundColor: '#121212' }, 
      headerTitleStyle: { color: '#00ff88' }, 
      headerTintColor: '#00ff88', 
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 120,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons name="camera" size={24} color="#00ff88" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name="pencil" size={24} color="#00ff88" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <SimpleLineIcons name="logout" size={24} color="#00ff88" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {chats.map(({ id, chatName }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
});
