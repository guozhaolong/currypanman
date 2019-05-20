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
class Survey extends Component {

  componentDidMount() {

  }

  onClick = (q,option)=>{
    this.props.dispatch({type:'survey/update',payload:{question:q,option:option}})
  }

  onSubmit = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'SurveyResult' }))
  }

  renderQuestion = (q,i) => {
    return (<View style={{marginBottom:10,}} key={i}>
        <Text style={{fontSize:18,opacity:.8}}>{i+1}、{q.title}</Text>
        <View style={{flexDirection:'row',justifyContent: 'space-around',marginTop:5}}>
        {[1,2,3,4,5].map( (option,i) => {
          const selected = q.answer >= option;
          return <TouchableOpacity key={option+""+i} onPress={()=>this.onClick(q,option)} style={styles.option}>
            <Icon.Ionicons name={selected ? Platform.OS === 'ios' ? 'ios-star' : 'md-star'
                                : Platform.OS === 'ios' ? 'ios-star-outline' : 'md-star-outline'}
                           size={50} color={Colors.primary} />
            <Text style={{color:Colors.primary}}>{option}</Text>
          </TouchableOpacity>
        })}
        </View>
      </View>
    );
  }


  render() {
    return (
      <View style={{flex:1}}>
        <Topbar leftIcon="arrow-back" leftClick={()=>this.props.navigation.goBack()} rightIcon="share" title="自我评测"/>
        <ScrollView style={styles.container}>
        <View style={styles.info}>
          <Text style={{opacity: .8}}>自我评估，批判性思维-知识、技能和态度</Text>
          <Text style={{opacity: .8}}>按照如下规则，为每一句话打分</Text>
          <Text style={{opacity: .8}}>5=完全同意，4=非常同意，3=同意，2=部分同意，1=不同意</Text>
        </View>
        {
          this.props.item.questions && this.props.item.questions.map((q,i) => {
            return this.renderQuestion(q,i)
          })
        }
        <View style={styles.bottomBtn}>
          <Button style={{height:50,borderColor:Colors.primary,backgroundColor:Colors.primary }}
                textStyle={{fontSize:18,color:'#fff'}} onPress={()=>this.onSubmit()}>提交评测</Button>
        </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    padding: 10,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    borderRadius: 5,
    borderColor:Colors.info,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  bottomBtn: {
    padding:10,
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default Survey
