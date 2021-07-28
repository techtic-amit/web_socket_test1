import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    useColorScheme,
    View,
  } from 'react-native'; 
  import { io } from "socket.io-client";
  import { w3cwebsocket as W3CWebSocket } from "websocket";
  var arr1=[],arr2=[],arr3=[];
var client;
  export default class Page1 extends Component
  {
      constructor(props)
      {
          super(props);
        
        this.state={
            data:[],
            CCCAGG_BTC:[],
            coinbase_ETH:[],
            Binance_BTC:[]
            
        }
      }
     
     async componentDidMount()
      {
        client = new W3CWebSocket('wss://streamer.cryptocompare.com/v2?api_key=4cd36f60061b045bced2eccfe9395b8f1ed192cc75a829fc1ffaf80f5b58d01e');
 
        await this.fun1();
      }
    fun1=async()=>
    {
      
        var subRequest ={
            "action": "SubAdd",
            "subs": ["5~CCCAGG~BTC~USD", "0~Coinbase~ETH~USD", "2~Binance~BTC~USDT"],
        }

         setTimeout(client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send(JSON.stringify(subRequest));
          },1000);
        //   client.send(JSON.stringify({
        //     "action": "SubAdd",
        //     "subs": ["2~Coinbase~BTC~USD"]
        //   }));
       
            try{
            client.onmessage = (message) => {
                //console.log(message);
                const result = Object.entries(JSON.parse(message.data)).map(([key, val]) => ({
                    [key]: val
                  }));
               
                
                  if(result[0]['TYPE']=="5")
                  {
                    arr1.push(JSON.parse(message.data));
                  }
                  else if(result[0]['TYPE']=="0")
                  {
                      arr2.push(JSON.parse(message.data));
                  }
                  else if(result[0]['TYPE']=="2")
                  {
                      arr3.push(JSON.parse(message.data));
                  }
                  else if(result[0]['TYPE']=="3")
                  {
                      client.close();
                  }
           

                }

                
                  
                client.onclose=()=>{
                    this.fun2(arr1,arr2,arr3);
                }
                }catch(err)
                {
                    console.log(err);
                }
                  
}
fun2=()=>{
    
    this.setState({CCCAGG_BTC:arr1});
    this.setState({coinbase_ETH:arr2});
    this.setState({Binance_BTC:arr3});
   
    // console.log(this.state.coinbase_ETH);
    // console.log(this.state.Binance_BTC);
    
}

      render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>CCCAGG BTC</Text>
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.CCCAGG_BTC}
          keyExtractor= {(item) => {
            return item.TYPE;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} >
              {/* <Image style={styles.image} source={{uri: item.image}}/> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.MARKET}</Text>
                <Text style={styles.count}>{item.PRICE}</Text>
                <Text style={styles.count}>Volume: {item.VOLUMEDAYTO}</Text>
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
            
                  
                <Text style={{textAlign:'left',marginBottom:-20}}>High In Day: {item.OPENDAY}</Text>
                <Text style={{textAlign:"right"}}>Low In Day: {item.LOWDAY}</Text>
                
              </View>
             
              
            </TouchableOpacity>
          )}}/>
            <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>COINBASE ETH</Text>

            <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.Binance_BTC}
          keyExtractor= {(item) => {
            return item.TYPE;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} >
              {/* <Image style={styles.image} source={{uri: item.image}}/> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.MARKET}</Text>
                <Text style={styles.count}>{item.PRICE}</Text>
                <Text style={styles.count}>Volume: {item.VOLUMEDAYTO}</Text>
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
            
                  
                <Text style={{textAlign:'left',marginBottom:-20}}>High In Day: {item.OPENDAY}</Text>
                <Text style={{textAlign:"right"}}>Low In Day: {item.LOWDAY}</Text>
                
              </View>
             
              
            </TouchableOpacity>
          )}}/>
      </View>

          );
      }
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
      backgroundColor:"#ebf0f7"
    },
    contentList:{
      flex:1,
    },
    cardContent: {
        flexDirection:'column',
      marginLeft:20,
      marginTop:10
    },
    image:{
      width:90,
      height:90,
      borderRadius:45,
      borderWidth:2,
      borderColor:"#ebf0f7"
    },
  
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginLeft: 20,
      marginRight: 20,
      marginTop:20,
      backgroundColor:"white",
      padding: 10,
      flexDirection:'column',
      borderRadius:30,
    },
  
    name:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#3399ff",
      fontWeight:'bold'
    },
    count:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#6666ff",
      right:1,
      padding:5
   
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      padding:10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "white",
      borderWidth:1,
      borderColor:"#dcdcdc",
    },
    followButtonText:{
      color: "#dcdcdc",
      fontSize:12,
    },
  });  
                  