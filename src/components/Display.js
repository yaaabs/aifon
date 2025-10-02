import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/calculatorStyles';
import { formatNumber } from '../utils/calculatorLogic';

const Display = ({ value }) => {
  const displayValue = formatNumber(value);
  
  // Choose font size based on length
  let textStyle = styles.displayText;
  if (displayValue.length > 6 && displayValue.length <= 9) {
    textStyle = styles.displayTextSmall;
  } else if (displayValue.length > 9) {
    textStyle = styles.displayTextTiny;
  }

  return (
    <View style={styles.display}>
      <Text style={textStyle} numberOfLines={1} adjustsFontSizeToFit>
        {displayValue}
      </Text>
    </View>
  );
};

export default Display;