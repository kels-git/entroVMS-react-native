import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useTheme } from '@/Hooks';
import { useOrientation } from '../useOrientation';
import Icon from 'react-native-dynamic-vector-icons';
import { useDispatch, useSelector } from 'react-redux';


const IndexAnnouncmentContainer = ({ navigation, route }) => {
  const orientation = useOrientation();
  const user = useSelector(user => user.user.profile);
  const { Fonts, Gutters, Layout, Colors, Images, MetricsSizes } = useTheme();
  const { itemTitle, itemIcon, itemDesc, itemDate, itemDateEnd, itemPlace, itemDistance,  } =
    route.params
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <View
        style={{
          height: 55,
          backgroundColor: '#184461',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontWeight: '700',
            fontSize: 16,
            marginLeft: 18,
            flex: 2,
           
          }}
        >
          Announcement
        </Text>

        <View style={{flex:1,  marginEnd: 10,  }}>
        <Icon
        name="x"
        type="Feather"
        size={35}
        color="#fff"
        style={{  alignSelf:'flex-end' }}
        onPress={() => {navigation.goBack();}}
      />
        </View>
        
    
      </View>

      <View style={{marginVertical: 20, marginHorizontal:20}}>
      <View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: `data:image/png;base64,${itemIcon}`,
          }}
        
          style={{  borderRadius: 5,  width: '100%',
          height: 220,
          }}
         resizeMode={'stretch'}
        />
      </View>
    </View>

    <View style={{ marginTop: 20, marginVertical: 20,  }}>
      <Text
        style={{
          fontSize: orientation === 'PORTRAIT' ? 18 : 22,
          fontWeight: 'bold',
          color: '#184461',
        }}
      >
        {itemTitle}
      </Text>

      <Text
        style={{
          fontSize: orientation === 'PORTRAIT' ? 16 : 20,
          fontWeight: '600',
          color: '#184461',
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        {itemDesc}
      </Text>
     
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        
          <Icon type="Feather" name="clock" color="#184461" size={20} />
          <Text style={{fontSize:12, color:"#184461", fontWeight:'700', marginLeft:5}}>Start <Text>Date:</Text></Text>
          <Text
            style={{
              color: '#184461',
              fontSize: orientation === 'PORTRAIT' ? 12 : 14,
              marginStart: 5,
              fontWeight:'600'
            }}
          >
            {new Date(
              Number(
                itemDate
                  .replace(/\/date\(/gi, '')
                  .replace(/\//gi, '')
                  .replace(/\)/gi, ''),
              ),
            ).toLocaleString()}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:4}}>
        
          <Icon type="Feather" name="clock" color="#184461" size={20} />
          <Text style={{fontSize:12, color:"#184461", fontWeight:'700', marginLeft:5, }}>End</Text> 
         <Text style={{marginStart:7, fontSize:12, color:"#184461", fontWeight:'700',}}>Date:</Text>
          <Text
            style={{
              color: '#184461',
              fontSize: orientation === 'PORTRAIT' ? 12 : 14,
              marginStart: 5,
              fontWeight:'600'
            }}
          >
            {new Date(
              Number(
                itemDateEnd
                  .replace(/\/date\(/gi, '')
                  .replace(/\//gi, '')
                  .replace(/\)/gi, ''),
              ),
            ).toLocaleString()}
          </Text>
        </View>
        
 

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon type="Ionicons" name="location" color="#184461" size={20} />
        <Text
          style={{
            fontSize: orientation === 'PORTRAIT' ? 14 : 20,
            fontWeight: '600',
            color: '#184461',
            marginTop: 5,
            marginBottom: 10,
            marginStart: 5,
          }}
        >
          {itemPlace}
        </Text>
      </View>
    </View>
      
      </View>
     
    </ScrollView>
  )
}

export default IndexAnnouncmentContainer
