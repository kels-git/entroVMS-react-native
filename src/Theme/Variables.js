/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  pureWhite:'#ffffff',
  text: '#212529',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  deepRed:'#FF2511',
  textColor:'#184461',
  mediumGray: '#D1D1D1',
  greenGradient:['#184461', '#45969A', '#74EBD5'],
  lightGreen:'#74EBD5',
  blackColor:'#000000',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
 export const FontSize = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
};


/**
 * Metrics Sizes
 */
 const zero = 0;
 const tiny = 5; // 5
 const small = tiny * 2; // 10
 const regular = tiny * 3; // 15
 const medium = tiny * 4; // 20
 const large = regular * 2; // 30
 const xlarge = regular * 45; // 30
 export const MetricsSizes = {
   zero,
   tiny,
   small,
   regular,
   medium,
   large,
   xlarge,
 };

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}



