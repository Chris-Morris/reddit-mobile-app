import { Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import React, { useState, useReducer, useEffect, createContext, useContext, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Navigation libs
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import PostListScreen from './src/screens/PostListScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
// import SigninScreen from './screens/SigninScreen';
// import SignupScreen from './screens/SignupScreen';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Set up Auth Context
import authContext from './context/authContext';
const AuthContext = createContext({});

// Set up Stack Navigator
const Tab = createBottomTabNavigator();
const PostsStack = createNativeStackNavigator();

function PostsScreen() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name="PostList" component={PostListScreen} options={{ headerShown: false }} />
      <PostsStack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerBackTitleVisible: false, headerTitle: '', headerTransparent: true }} />
    </PostsStack.Navigator>
  );
}

export default function App({ navigation }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log(e);
      };

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signIn: async data => {
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async data => {
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
  }), []);

  const SigninScreen = () => {
    const [username, setUsername] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
      if (username.length < 5) {
        setInvalidUsername(true);
      } else {
        setInvalidUsername(false);
      };

      if (username.length === 0) {
        setInvalidUsername(false);
      };

      if (password.length < 5) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
      };

      if (password.length === 0) {
        setInvalidPassword(false);
      };

      if (username.length >= 5 && password.length >= 5) {
        setInvalidUsername(false);
        setInvalidPassword(false);
        setShowButton(true);
      };
    }, [username, password]);

    const signinError = () =>
      Alert.alert(
        "Sign In Error",
        "Please enter required details",
        [
          { text: "OK" }
        ]
      );

    return (
      <ScrollView contentContainerStyle={signinStyle.container} >
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={signinStyle.background}
        />
        <DropShadow style={signinStyle.shadowProps} >
          <Card containerStyle={signinStyle.card}>
            <Card.Title>Sign In</Card.Title>
            <Card.Divider />
            {!invalidUsername ?
              <View>
                <Text>Please enter your username</Text>
                <Text>(min 5 characters)</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signinStyle.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              :
              <View>
                <Text>Please enter a valid username</Text>
                <Text>(min 5 characters)</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signinStyle.invalidInput}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            }

            {invalidPassword ?
              <View>
                <Text>Please enter a valid password</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signinStyle.invalidInput}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              :
              <View>
                <Text>Please enter your password</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signinStyle.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            }
            {showButton ?
              <TouchableOpacity style={signinStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
              :
              <TouchableOpacity style={signinStyle.inactiveButton} onPress={signinError} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
            }
          </Card>
        </DropShadow>
      </ScrollView>
    );
  }

  const signinStyle = {
    container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'blue',
      height: 600,
      paddingTop: 100
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
    card: {
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5
    },
    shadowProps: {
      shadowColor: '#171717',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2
    },
    input: {
      height: 30,
      width: 200,
      backgroundColor: 'rgb(236, 240, 246)',
      borderStyle: 'solid',
      borderColor: 'rgb(0, 122, 204)',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10
    },
    invalidInput: {
      height: 30,
      width: 200,
      backgroundColor: 'rgb(236, 240, 246)',
      borderStyle: 'solid',
      borderColor: 'rgb(255, 2, 2)',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10
    },
    button: {
      backgroundColor: 'rgb(0, 122, 204)',
      height: 30,
      width: 124,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 35
    },
    inactiveButton: {
      backgroundColor: 'rgb(51, 51, 51)',
      height: 30,
      width: 124,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 35
    }
  }

  const SignupScreen = () => {
    const [firstname, setFirstname] = useState('');
    const [invalidFirstname, setInvalidFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [invalidLastname, setInvalidLastname] = useState('');
    const [username, setUsername] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
      if (firstname.length < 2) {
        setInvalidFirstname(true);
      } else {
        setInvalidFirstname(false);
      };

      if (firstname.length === 0) {
        setInvalidFirstname(false);
      };

      if (lastname.length < 2) {
        setInvalidLastname(true);
      } else {
        setInvalidLastname(false);
      };

      if (lastname.length === 0) {
        setInvalidLastname(false);
      };

      if (username.length < 5) {
        setInvalidUsername(true);
      } else {
        setInvalidUsername(false);
      };

      if (username.length === 0) {
        setInvalidUsername(false);
      };

      if (password.length < 5) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
      };

      if (password.length === 0) {
        setInvalidPassword(false);
      };

      if (firstname.length >= 2 && lastname.length >= 2 && username.length >= 5 && password.length >= 5) {
        setInvalidFirstname(false);
        setInvalidLastname(false);
        setInvalidUsername(false);
        setInvalidPassword(false);
        setShowButton(true);
      } else {
        setShowButton(false);
      };
    }, [firstname, lastname, username, password]);

    const signupError = () =>
      Alert.alert(
        "Sign Up Error",
        "Please enter required details",
        [
          { text: "OK" }
        ]
      );

    return (
      <ScrollView contentContainerStyle={signupStyle.container} >
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={signupStyle.background}
        />
        <DropShadow style={signupStyle.shadowProps} >
          <Card containerStyle={signupStyle.card}>
            <Card.Title>Sign Up</Card.Title>
            <Card.Divider />
            <View>
              <Text>First name</Text>
              <TextInput
                autoCapitalize='sentences'
                autoCorrect={false}
                clearButtonMode='always'
                style={signupStyle.input}
                placeholder="First Name"
                value={firstname}
                onChangeText={setFirstname}
              />
            </View>

            <View>
              <Text>Last name</Text>
              <TextInput
                autoCapitalize='sentences'
                autoCorrect={false}
                clearButtonMode='always'
                style={signupStyle.input}
                placeholder="Last Name"
                value={lastname}
                onChangeText={setLastname}
                secureTextEntry
              />
            </View>

            {!invalidUsername ?
              <View>
                <Text>Username</Text>
                <Text>(min 5 characters)</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signupStyle.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              :
              <View>
                <Text>Username</Text>
                <Text>(min 5 characters)</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signupStyle.invalidInput}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            }

            {invalidPassword ?
              <View>
                <Text>Password</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signupStyle.invalidInput}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              :
              <View>
                <Text>Password</Text>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={signupStyle.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            }

            {showButton ?
              <TouchableOpacity style={signupStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
              :
              <TouchableOpacity style={signupStyle.inactiveButton} onPress={signupError} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
            }
          </Card>
        </DropShadow>
      </ScrollView>
    );
  }

  const signupStyle = {
    container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'blue',
      height: 600,
      paddingTop: 40
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 400,
    },
    card: {
      height: 400,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5
    },
    shadowProps: {
      shadowColor: '#171717',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2
    },
    input: {
      height: 30,
      width: 200,
      backgroundColor: 'rgb(236, 240, 246)',
      borderStyle: 'solid',
      borderColor: 'rgb(0, 122, 204)',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10
    },
    invalidInput: {
      height: 30,
      width: 200,
      backgroundColor: 'rgb(236, 240, 246)',
      borderStyle: 'solid',
      borderColor: 'rgb(255, 2, 2)',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10
    },
    button: {
      backgroundColor: 'rgb(0, 122, 204)',
      height: 30,
      width: 124,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 35
    },
    inactiveButton: {
      backgroundColor: 'rgb(51, 51, 51)',
      height: 30,
      width: 124,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 35
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken ?
          <Tab.Navigator screenOptions={{
            headerShown: false
          }}>
            {/* <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }} /> */}
            <Tab.Screen name="Posts" component={PostsScreen} options={{
              tabBarLabel: 'Posts',
              tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Settings" component={AccountScreen} options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color, size }) => (
                <Icon name="user-circle" color={color} size={size} />
              ),
            }} />
          </Tab.Navigator>
          :
          <Tab.Navigator screenOptions={{
            headerShown: false
          }}>
            <Tab.Screen name="Sign In" component={SigninScreen} options={{
              tabBarLabel: 'Sign In',
              tabBarIcon: ({ color, size }) => (
                <Icon name="key" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Sign Up" component={SignupScreen} options={{
              tabBarLabel: 'Sign Up',
              tabBarIcon: ({ color, size }) => (
                <Icon name="sign-in" color={color} size={size} />
              ),
            }} />
          </Tab.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}