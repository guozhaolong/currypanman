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
class Test extends Component {

  componentDidMount() {

  }

  onBack = () => {
    if(this.props.viewMode)
      this.props.dispatch(NavigationActions.navigate({ routeName: 'TestResult' }))
    else
      this.props.navigation.goBack()
  }

  onRadioClick = (option) => {
    this.props.dispatch({type:'test/updateQuestion',payload:{answer:option.tag}})
    this.props.dispatch({type:'test/next'})
  }

  onPreview = () => {
    this.props.dispatch({type:'test/preview'})
  }

  onNext = () => {
    this.props.dispatch({type:'test/next'})
  }

  onSubmit = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'TestResult' }))
  }

  renderRadio = (question,viewMode) => {
    return (
      question.options.map( (option,i) => {
        return <View key={i}>
          <TouchableOpacity disabled={viewMode} onPress={()=>this.onRadioClick(option)} style={styles.option}>
            <Icon.Ionicons name={question.answer === option.tag
                                ? Platform.OS === 'ios' ? 'ios-radio-button-on' : 'md-radio-button-on'
                                : Platform.OS === 'ios' ? 'ios-radio-button-off' : 'md-radio-button-off'}
                           size={24} color={question.answer === option.tag ? Colors.primary : Colors.info} />
            <Text style={{fontSize:18,opacity:.8,marginLeft:5}}>{option.tag}</Text>
            { option.type === 'pic' && <Image style={styles.optionPic} source={{uri: option.content}}/>}
            { option.type === 'text' && <Text style={{fontSize:18,opacity:.8,marginLeft:10,marginRight:20}} >{option.explain}</Text>}
            {viewMode && option.correct === 2 && <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
                                                    size={50} color={Colors.primary} style={{marginLeft: 10}}/>}
            {viewMode && option.correct !== 2 && <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                                                    size={50} color={Colors.danger} style={{marginLeft: 10}}/>}
          </TouchableOpacity>
          { viewMode && <View style={styles.optionAnswer}><Text style={{fontSize:16,opacity:.8}}>{option.explain}</Text></View> }
        </View>
      })
    );
  }

  render() {
    const previewDisabled = this.props.num === 0;
    const nextVisible = this.props.viewMode || this.props.item.questions && this.props.num < this.props.item.questions.length -1;
    const nextDisabled = !(this.props.item.questions && this.props.num < this.props.item.questions.length -1 && this.props.selectedQuestion.answer !== '');
    const submitVisible = !this.props.viewMode && this.props.item.questions && this.props.num === this.props.item.questions.length -1;
    const submitDisabled = this.props.selectedQuestion.answer === '';
    return (
      <View style={{flex:1}}>
        <Topbar leftIcon="arrow-back" leftClick={()=>this.onBack()} rightIcon="share" title="选择题"/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.num + 1}、{this.props.selectedQuestion && this.props.selectedQuestion.title}</Text>
          {
            this.props.selectedQuestion && this.props.selectedQuestion.type === 'pic' && <Image style={styles.titlePic}  source={{uri: this.props.selectedQuestion.desc}}/>
          }
          {
            this.props.selectedQuestion && this.props.selectedQuestion.type === 'text' && <Text style={{fontSize:18,opacity:.8,marginLeft:10,marginRight:20}} >{this.props.selectedQuestion.desc}</Text>
          }
        </View>
        <ScrollView style={styles.optionContainer}>
          {
            this.props.selectedQuestion && this.props.selectedQuestion.options && this.renderRadio(this.props.selectedQuestion,this.props.viewMode)
          }
        </ScrollView>
        <View style={styles.bottomBtnGroup}>
          <Button style={[styles.bottomBtn,{borderColor:previewDisabled?Colors.info:Colors.primary}]}
                  textStyle={{color:previewDisabled?Colors.info:Colors.primary}}
                  disabled={previewDisabled}
                  onPress={()=>this.onPreview()} >上一题</Button>
          {
            nextVisible && <Button style={[styles.bottomBtn,{borderColor:nextDisabled?Colors.info:Colors.primary}]}
                                   textStyle={{color:nextDisabled?Colors.info:Colors.primary}}
                                   disabled={nextDisabled}
                                   onPress={()=>this.onNext()}>下一题</Button>
          }
          {
            submitVisible && <Button style={[styles.bottomBtn,submitDisabled?{borderColor:Colors.info}:{backgroundColor:Colors.primary}]}
                                     textStyle={[{fontSize:18},submitDisabled?{color:Colors.info}:{color:'#fff'}]}
                                     disabled={submitDisabled}
                                     onPress={()=>this.onSubmit()}>提    交</Button>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    opacity: .8,
  },
  titlePic: {
    width: Layout.width-20,
    height: 100,
    marginTop: 5,
  },
  optionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    height: Layout.height-Layout.topBarHeight-Layout.statusBarHeight-200,
  },
  optionPic: {
    width: 100,
    height: 80,
    marginLeft: 10,
  },
  option: {
    marginTop: 10,
    flexDirection:'row',
    alignItems:'center',
  },
  optionAnswer:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 5,
    borderBottomColor:Colors.info,
    borderBottomWidth: 1,
  },
  bottomBtnGroup: {
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bottomBtn: {
    height:50,
    width: 100,
  }
});

export default Test
