import React, { Component } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import TabBarIcon from "../components/TabBarIcon";

@connect(({ user }) => ({ ...user }))
class Course extends Component {
  static navigationOptions = {
    tabBarLabel: '课程',
    tabBarIcon: ({ focused, }) => (
      <TabBarIcon focused={focused} name="paper"/>
    ),
  }

  componentDidMount() {
    this.props.dispatch({type:'asset/fetch'})
  }

  render() {

    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Course
