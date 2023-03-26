/**
 * This file contains all application's style relative to fonts
 */
 import { StyleSheet, PixelRatio } from 'react-native';
 import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
 /**
  *
  * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
  * @return {*}
  */
 export default function ({ FontSize, Colors }) {
   return StyleSheet.create({
     textSmall: {
       fontSize: FontSize.small,
       color: Colors.text,
     },
     textRegular: {
       fontSize: FontSize.regular,
       color: Colors.text,
     },
     textMedium: {
       fontSize: FontSize.medium,
       color: Colors.text,
     },
     textLarge: {
       fontSize: FontSize.large,
       color: Colors.text,
     },
     textWeightBold: {
       fontWeight: 'bold',
     },
     textWeightMedium: {
       fontWeight: '500',
     },
     header: {
       fontSize: FontSize.medium,
       fontWeight: '500',
       color: Colors.primary,
     },
     titleSmall: {
       fontSize: FontSize.small * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleRegular: {
       fontSize: FontSize.regular * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleLarge: {
       fontSize: FontSize.large * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     textAlignTop: {
       textAlignVertical: 'top',
     },
     textCenter: {
       textAlign: 'center',
     },
     textJustify: {
       textAlign: 'justify',
     },
     textLeft: {
       textAlign: 'left',
     },
     textRight: {
       textAlign: 'right',
     },
     textUnderline: {
       textDecorationLine: 'underline',
     },
 
     // custom
     cardHeading: {
       fontWeight: 'bold',
       color: Colors.primary,
       fontSize: 18,
     },
     cardTitle: {
       fontWeight: 'bold',
       color: Colors.secondary,
     },
     cardDate: {
       fontWeight: 'bold',
       color: Colors.bodyText,
     },
 
     
   });
 }
 