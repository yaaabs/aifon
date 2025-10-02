import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/calculatorStyles';
import { formatNumber } from '../utils/calculatorLogic';

const Display = ({ value, equation }) => {
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
      {/* Equation display - shows the full calculation expression like iPhone */}
      {equation ? (
        <View style={styles.equationContainer}>
          <Text style={styles.equationText} numberOfLines={1} ellipsizeMode="head">
            {equation}
          </Text>
        </View>
      ) : (
        <View style={styles.equationPlaceholder} />
      )}
      {/* Main display - shows current number */}
      <Text style={textStyle} numberOfLines={1} adjustsFontSizeToFit>
        {displayValue}
      </Text>
    </View>
  );
};

export default Display;