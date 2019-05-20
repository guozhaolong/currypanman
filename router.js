import React, {PureComponent} from 'react'
import {BackHandler, Animated, Easing, View, Platform, StatusBar, StyleSheet} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  NavigationActions,
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'

import Login from './screens/Login'
import Home from './screens/Home'
import Course from './screens/Course'
import Discover from './screens/Discover'
import Setting from './screens/Setting'
import Test from './screens/Test'
import TestResult from './screens/TestResult'
import Survey from './screens/Survey'
import SurveyResult from './screens/SurveyResult'
import {AppLoading, Asset, Font, Icon} from "expo";

const HomeNavigator = createBottomTabNavigator({
  Home: {screen: Home},
  Course: {screen: Course},
  Discover: {screen: Discover},
  Setting: {screen: Setting},
})

HomeNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  if (routeName === 'Home') {
    return {
      headerTitle: '主页',
    }
  }
  if (routeName === 'Course') {
    return {
      headerTitle: '课程',
    }
  }
  if (routeName === 'Discover') {
    return {
      headerTitle: '发现',
    }
  }
  if (routeName === 'Setting') {
    return {
      headerTitle: '我的',
    }
  }
}

const MainNavigator = createDrawerNavigator(
  {
    HomeNavigator: {screen: HomeNavigator},
  },
)

const AppNavigator = createStackNavigator(
  {
    Main: {screen: MainNavigator},
    Login: {screen: Login},
    Test: {screen: Test},
    TestResult: {screen: TestResult},
    Survey: {screen: Survey},
    SurveyResult: {screen: SurveyResult},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: (sceneProps) => {
        const {layout, position, scene} = sceneProps
        const {index} = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return {opacity, transform: [{translateY}]}
      },
    }),
  },
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
)

const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({app, router}) => ({app, router}))
class Router extends PureComponent {

  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const {dispatch, router} = this.props
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <App dispatch={dispatch} state={router}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Router
