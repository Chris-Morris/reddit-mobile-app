import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import React, { useState, useReducer, useEffect, useMemo, createContext, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from 'expo-linear-gradient';

// Import Navigation libs
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import PostListScreen from './screens/PostListScreen';
import PostDetailScreen from './screens/PostDetailScreen';
// import SigninScreen from './screens/SigninScreen';
// import SignupScreen from './screens/SignupScreen';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Set up Auth Context
const AuthContext = createContext({});

// Set up Stack Navigator
const Tab = createBottomTabNavigator();
const PostsStack = createNativeStackNavigator();

function PostsScreen() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name="PostList" component={PostListScreen} options={{headerShown: false}} />
      <PostsStack.Screen name="PostDetail" component={PostDetailScreen} options={{headerBackTitleVisible: false, headerTitle: '', headerTransparent: true}} />
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

    return (
      <View style={signinStyle.container} >
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
                />
              </View>
            }
            {showButton ?
              <TouchableOpacity style={signinStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
              :
              <TouchableOpacity style={signinStyle.inactiveButton} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
            }
          </Card>
        </DropShadow>
      </View>
    );
  }

  const signinStyle = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
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

    return (
      <View style={signinStyle.container} >
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
                />
              </View>
            }

            {showButton ?
              <TouchableOpacity style={signinStyle.button} onPress={() => signIn({ username, password })}><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
              :
              <TouchableOpacity style={signinStyle.inactiveButton} ><Text style={{ color: 'white' }} >Sign In</Text></TouchableOpacity>
            }
          </Card>
        </DropShadow>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken ?
          <Tab.Navigator screenOptions={{
            headerShown: false
          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Posts" component={PostsScreen} options={{
              tabBarLabel: 'Posts',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Settings" component={AccountScreen} options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
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
                <Ionicons name="finger-print" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Sign Up" component={SignupScreen} options={{
              tabBarLabel: 'Sign Up',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-in" color={color} size={size} />
              ),
            }} />
          </Tab.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}