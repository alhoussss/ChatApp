import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imgurl, setImgurl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back To Login',
      headerStyle: { backgroundColor: '#121212' },
      headerTitleStyle: { color: '#00ff88' },
      headerTintColor: '#00ff88',
    });
  }, [navigation]);

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        const user = authUser.user;
        updateProfile(user, {
          displayName: fullname,
          photoURL: imgurl,
        })
          .then(() => console.log('Profile Updated!'))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={styles.title}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Fullname"
          placeholderTextColor="#00ff88"
          inputStyle={styles.input}
          autoFocus
          type="text"
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />
        <Input
          placeholder="Email"
          placeholderTextColor="#00ff88"
          inputStyle={styles.input}
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#00ff88"
          inputStyle={styles.input}
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Image URL (Optional)"
          placeholderTextColor="#00ff88"
          inputStyle={styles.input}
          type="text"
          value={imgurl}
          onChangeText={(text) => setImgurl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#121212', 
  },
  title: {
    marginBottom: 50,
    color: '#00ff88',
    fontFamily: 'Roboto', 
  },
  inputContainer: {
    width: 300,
    marginVertical: 10,
  },
  input: {
    color: '#00ff88', 
  },
  buttonContainer: {
    width: 200,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#00ff88',
    borderWidth: 2,
    borderRadius: 25,
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
