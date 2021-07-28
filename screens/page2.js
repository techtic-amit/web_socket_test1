import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Picker,
    Button,
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
            Binance_BTC:[],
            optionVal:''
            
        }
      }
    
    fun1=async()=>
    {
        client = new W3CWebSocket('wss://streamer.cryptocompare.com/v2?api_key=494a608df579b314395ece536ce2d5c89aca67f86a4d56e0959914e0580132e5');
        this.setState({CCCAGG_BTC:[]});
        arr1=[]
        if(this.state.optionVal.length == 0)
        {
            alert("Please select an option");
        }
        else
        {
            var subRequest ={
                "action": "SubAdd",
                "subs": [this.state.optionVal],
            }
    
            setTimeout( client.onopen = () => {
             
                client.send(JSON.stringify(subRequest));
             } ,1000);
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
                          arr1.push(JSON.parse(message.data));
                      }
                      else if(result[0]['TYPE']=="2")
                      {
                          arr1.push(JSON.parse(message.data));
                      }
                      else if(result[0]['TYPE']=="3")
                      {
                          client.close();
                      }
               
    
                    }
    
                    
                      
                    client.onclose=()=>{
                        this.fun2(arr1);
                    }
                    }catch(err)
                    {
                        console.log(err);
                    }
        }
      
       
                  
}
fun2=()=>{
    
    this.setState({CCCAGG_BTC:arr1});
    
    // console.log(this.state.coinbase_ETH);
    // console.log(this.state.Binance_BTC);
    
}

      render(){
        return(
        <View style={{flex:1}}>
        <Text style={{fontSize:30,fontWeight:'bold',marginBottom:15,alignSelf:'center',textAlign:"center"}}>Select Currency</Text>
        <Picker
        selectedValue={this.state.optionVal}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) =>this.setState({optionVal:itemValue})}
      >
            <Picker.Item label="Select Currency" value=""></Picker.Item>
        <Picker.Item label="CCCAGG~BTC" value="5~CCCAGG~BTC~USD" />
        
        <Picker.Item label="Binance~BTC" value="2~Binance~BTC~USDT" />
        
      </Picker>

      <Button
  onPress={()=>this.fun1()}
  title="Get Data"
  color="#339BFF"
/>


                <FlatList
        style={styles.root}
        data={this.state.CCCAGG_BTC}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.TYPE;
        }}
        renderItem={({item}) => {
          return(
            <View style={styles.container}>
              {/* <Image source={{uri:Group.image}} style={styles.avatar}/> */}
              <View style={styles.content}>
                <View style={styles.mainContent}>
                  <View style={styles.text}>
                    <Text style={styles.groupName}>{item.MARKET}</Text>
                  </View>
                  <Text style={styles.countMembers}>
                    Volume :{item.VOLUMEDAY} 
                  </Text>
                  <Text style={styles.countMembers}>
                    Price :{item.PRICE} 
                  </Text>
                  <Text style={{textAlign:'right',fontSize:13}}>
                    High on Day :{item.OPENDAY} 
                  </Text>
                
                  <Text style={{textAlign:'right',fontSize:13}}>
                    Low on Day :{item.LOWDAY} 
                  </Text>
                
                </View>
              </View>
            </View>
          );
        }}/>
     
     </View>
          );
      }
  }
  const styles = StyleSheet.create({
    root: {
      backgroundColor: "#FFFFFF"
    },
    container: {
      padding: 16,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#FFFFFF",
      alignItems: 'flex-start'
    },
    avatar: {
      width:55,
      height:55,
      borderRadius:25,
    },
    text: {
      marginBottom: 5,
      flexDirection: 'row',
      flexWrap:'wrap'
    },
    content: {
      flex: 1,
      marginLeft: 16,
      marginRight: 0
    },
    mainContent: {
      marginRight: 60
    },
    memberImage: {
      height: 30,
      width: 30,
      marginRight:4,
      borderRadius:10,
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    countMembers:{
      color:"#20B2AA",
      fontSize:20
    },
    timeAgo:{
      fontSize:12,
      color:"#696969"
    },
    groupName:{
      fontSize:23,
      color:"#1E90FF"
    },
    groupMembersContent:{
      flexDirection:'row',
      marginTop:10
    }
  });  