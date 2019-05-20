import React, { Component } from 'react'
import { StyleSheet, View,Text, } from 'react-native'
import { connect } from 'react-redux'
import TabBarIcon from "../components/TabBarIcon";
import Topbar from "../components/Topbar";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import {MonoText} from "../components/StyledText";
import {Button} from "../components/Button";
import {Icon} from 'expo';
import * as Progress from 'react-native-progress';
import { NavigationActions } from 'react-navigation'

@connect(({ user }) => ({ ...user }))
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '主页',
    tabBarIcon: ({ focused, }) => (
      <TabBarIcon focused={focused} name="home"/>
    ),
  }

  componentDidMount() {

  }

  testClickHandle = () => {
    this.props.dispatch({type:'test/fetch'})
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Test' }))
  }

  assessClickHandle = () => {
    this.props.dispatch({type:'survey/fetch'})
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Survey' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Topbar rightIcon="search" hasBorder={false}/>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>剩余</Text>
              <View style={styles.numContainer}>
                <MonoText style={styles.numLabel}>10</MonoText>
                <Text style={styles.label}>天</Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>今日题目</Text>
              <View style={styles.numContainer}>
                <MonoText style={styles.numLabel}>10</MonoText>
                <Text style={styles.label}>题</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>注意力训练</Text>
            </View>
            <View style={styles.col}>
              <Button>修改计划</Button>
            </View>
          </View>
          <View style={styles.card1}>
              <View style={{flexDirection:'row',}}>
                <Text style={styles.label1}>学习进度</Text>
                <Text style={[styles.label1,{fontWeight:'bold'}]}>100/200</Text>
              </View>
              <View style={{alignItems: 'center',}}>
                <Icon.Ionicons name={'md-cloud-download'} size={26} color={Colors.info}/>
                <Text style={{fontSize:12,opacity:.8}}>下载试题</Text>
              </View>
              <View style={{alignItems: 'center',}}>
                <Icon.Ionicons name={'md-list-box'} size={26} color={Colors.info}/>
                <Text style={{fontSize:12,opacity:.8}}>试题列表</Text>
              </View>
          </View>
          <View style={{height:50,padding: 20}}>
            <Progress.Bar progress={0.8} width={null} color={Colors.warning}/>
          </View>
        </View>
        <View style={{alignItems:'center',opacity:.8}}>
          <Text>今日需学习20/20 今日需复习5</Text>
        </View>
        <View style={{margin:20}}>
          <Button onPress={this.testClickHandle}
                  style={{height:50,backgroundColor:Colors.primary}}
                  textStyle={{fontSize:18,color:'#fff'}}>开始训练</Button>
        </View>
        <View style={{marginLeft:20,marginRight:20}}>
          <Button onPress={this.assessClickHandle} style={{height:50}} textStyle={{fontSize:18}}>能力评测</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBackground
  },
  card: {
    backgroundColor: Colors.cardBackground,
    margin: 20,
    width: Layout.width-40,
    borderRadius: 15,
  },
  row: {
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  col: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numContainer: {
    flexDirection:'row',
    alignItems:'flex-end',
    height:60,
  },
  numLabel: {
    fontSize: 50,
    opacity: .8,
  },
  label: {
    fontSize: 20,
    opacity: .8,
  },
  card1:{
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor:Colors.containerBackground,
    borderTopWidth: 1,
    margin:20,
    paddingTop:20
  },
  label1: {
    fontSize: 16,
    opacity: .8,
  },
});

export default Home
