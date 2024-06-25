import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, addDoc, getFirestore } from '../firebase';

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState('');

  const createChat = async () => {
    const db = getFirestore();
    await addDoc(collection(db, 'chats'), {
      chatName: chat,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerBackTitle: 'Chats',
      headerStyle: { backgroundColor: '#121212' },
      headerTitleStyle: { color: '#00ff88' },
      headerTintColor: '#00ff88',
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        placeholderTextColor="#00ff88"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" size={24} type="antdesign" color="#00ff88" />
        }
        inputStyle={{ color: '#00ff88' }}
      />
      <Button
        disabled={!chat}
        onPress={createChat}
        title="Create New Chat"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </KeyboardAvoidingView>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212', // Dark background for the screen
    padding: 30,
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#00ff88',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  buttonTitle: {
    color: '#00ff88',
    fontFamily: 'Roboto', 
    textTransform: 'uppercase',
  },
});
