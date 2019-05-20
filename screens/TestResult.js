import React, { Component } from 'react'
import {StyleSheet, View, Platform, Image, TouchableOpacity,Text,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import Topbar from "../components/Topbar";
import Colors from "../constants/Colors";
import { Icon } from "expo";
import Layout from "../constants/Layout";
import Button from "../components/Button"
import {NavigationActions} from "react-navigation";

@connect(({ test }) => ({ ...test }))
class TestResult extends Component {

  componentDidMount() {
    this.props.dispatch({type:'test/computeScore'})
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
  }

  onViewDetail = (q) => {
    this.props.dispatch({type:'test/viewQuestion',payload:{question:q}});
    this.props.dispatch({type:'test/setValue',payload:{viewMode:true}});
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Test' }))
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
            {this.props.score === 100 ? "天呐，你居然答对了全部的题，你已经无敌了赶紧滚"
              :this.props.score >= 80 ? "你已经很牛逼了，再努力一把就无敌了"
              :this.props.score >= 60 ? "你有点弱，好好努力吧小蠢猪"
                  :"你这个傻逼连60分都没达到，你特么吃屎去吧"}
          </Text>
        </View>
        <ScrollView style={styles.questionContainer}>
          {
            this.props.item.questions.map((q,i) => {
              const isCorrect = !!q.options.find(o => q.answer === o.tag && o.correct === 2);
              return <View style={styles.question} key={i}>
                <Text style={styles.questionText}>{q.id}、</Text>
                <Text style={[styles.questionText,{color:Colors.primary,fontWeight:'500'}]}>{q.answer}</Text>
                { isCorrect && <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
                                                                    size={50} color={Colors.success} style={{marginLeft: 10}}/>}
                { !isCorrect && <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                                                                    size={50} color={Colors.danger} style={{marginLeft: 10}}/>}
                <Button style={{height:50,borderColor:Colors.info}} textStyle={{color:Colors.info}}
                        onPress={()=>this.onViewDetail(q)}>解题思路</Button>
              </View>
            })
          }
        </ScrollView>
        <View style={styles.bottomBtnGroup}>
          <Button style={[styles.bottomBtn,{borderColor:Colors.primary,backgroundColor:Colors.primary }]}
                  textStyle={{fontSize:18,color:'#fff'}}
                  onPress={()=>this.onClose()} >继续努力</Button>
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
  questionContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor:Colors.info,
    borderWidth: 1,
  },
  question: {
    flexDirection:'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems:'center',
    justifyContent: 'space-between',
    borderBottomColor:Colors.containerBackground,
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize:20,
    opacity: .8,
    width: 60,
  },
  bottomBtnGroup: {
    flexDirection:'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  bottomBtn: {
    height:50,
    width: 100,
  }
});

export default TestResult
