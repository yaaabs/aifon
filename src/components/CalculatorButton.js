import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/calculatorStyles';

const CalculatorButton = ({ value, type, onPress, isActive = false, isWide = false }) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    if (isWide) {
      buttonStyle.push(styles.wideButton);
    }

    switch (type) {
      case 'number':
        buttonStyle.push(styles.numberButton);
        break;
      case 'function':
        buttonStyle.push(styles.functionButton);
        break;
      case 'operation':
        if (isActive) {
          buttonStyle.push(styles.operationButtonActive);
        } else {
          buttonStyle.push(styles.operationButton);
        }
        break;
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyle = [styles.buttonText];

    switch (type) {
      case 'number':
        textStyle.push(styles.numberButtonText);
        break;
      case 'function':
        textStyle.push(styles.functionButtonText);
        break;
      case 'operation':
        if (isActive) {
          textStyle.push(styles.operationButtonActiveText);
        } else {
          textStyle.push(styles.operationButtonText);
        }
        break;
    }

    return textStyle;
  };

  // Get the display text with proper iPhone-style icons
  const getDisplayText = () => {
    switch (value) {
      case '⌫':
        return '⌫'; // Delete icon (already correct)
      case '+/-':
        return '+/−'; // Original iPhone-style plus/minus with proper minus
      default:
        return value;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => onPress(value)}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{getDisplayText()}</Text>
    </TouchableOpacity>
  );
};

export default CalculatorButton;