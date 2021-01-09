import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity,ScrollView, FlatList } from "react-native";
import {SearchBar,Header} from 'react-native-elements'
import db from "../Config"
export default class ReadStory extends React.Component{
    constructor(){
        super()
       this.state={
            search:'',
            docId:[],
            lastVisibleStory: null,
        }
    }
    componentDidMount=async()=>{
        const query = await db.collection("stories").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                docId:[...this.state.docId,doc.data()],
                lastVisibleStory:doc
            })
        })
    }

    

    render(){
        
                return (
                        
                             
                        <FlatList
                    data ={ this.state.docId }
                   renderItem ={({item})=>(
                       <View style = {{borderBottomWidth:2}}>
                            <Text>{"Title: " + item.title}</Text>
                            <Text>{"Author: " + item.author}</Text>

                       </View>
                   )} 
                   keyExtractor = {(item, index)=>{index.toString()}}
                   onEndReached = {this.fetchMoreStories}
                   onEndReachedThreshold = {0.7}
            />
                );

              }
              fetchMoreStories=async()=>{
                const query = await db.collection("stories").startAfter(this.state.lastVisibleTransactionStory).limit(10).get();
                query.docs.map((doc)=>{
                    this.setState({
                        docId:[...this.state.docId,doc.data()],
                        lastVisibleStory : doc
                    })
                })
            }
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBar:{
        width:500   
    }
  });