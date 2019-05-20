import React, { Component } from 'react'
import {StyleSheet, View, Platform, Image, TouchableOpacity,Text,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import Topbar from "../components/Topbar";
import Colors from "../constants/Colors";
import { Icon } from "expo";
import Layout from "../constants/Layout";
import Button from "../components/Button"
import {NavigationActions} from "react-navigation";

@connect(({ survey }) => ({ ...survey }))
class SurveyResult extends Component {

  componentDidMount() {
    this.props.dispatch({type:'survey/computeScore'})
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Topbar rightIcon="share" title="测试结果"/>
        <View style={styles.titleContainer}>
          <Button disabled style={styles.score}
                  textStyle={{fontSize:18,color:'#fff'}}>总分：{this.props.score}
          </Button>
          <Text style={{opacity:.8,fontSize: 20,marginTop:5}}>
            {this.props.item.desc}
          </Text>
        </View>
        <View style={styles.bottomBtnGroup}>
          <Button style={[styles.bottomBtn,{borderColor:Colors.primary,backgroundColor:Colors.primary }]}
                  textStyle={{fontSize:18,color:'#fff'}}
                  onPress={()=>this.onClose()} >滚</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  score: {
    height: 50,
    backgroundColor:Colors.primary,
  },
  bottomBtnGroup: {
    flexDirection:'row',
    justifyContent: 'center',
    padding: 10,
  },
  bottomBtn: {
    height:50,
    width: 100,
  }
});

export default SurveyResult
