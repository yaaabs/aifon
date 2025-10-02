import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from '../styles/calculatorStyles';
import Display from './Display';
import CalculatorButton from './CalculatorButton';
import { calculate } from '../utils/calculatorLogic';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const buttonLayout = [
    [
      { value: 'AC', type: 'function' },
      { value: '±', type: 'function' },
      { value: '%', type: 'function' },
      { value: '÷', type: 'operation' }
    ],
    [
      { value: '7', type: 'number' },
      { value: '8', type: 'number' },
      { value: '9', type: 'number' },
      { value: '×', type: 'operation' }
    ],
    [
      { value: '4', type: 'number' },
      { value: '5', type: 'number' },
      { value: '6', type: 'number' },
      { value: '-', type: 'operation' }
    ],
    [
      { value: '1', type: 'number' },
      { value: '2', type: 'number' },
      { value: '3', type: 'number' },
      { value: '+', type: 'operation' }
    ],
    [
      { value: '0', type: 'number', isWide: true },
      { value: '.', type: 'number' },
      { value: '=', type: 'operation' }
    ]
  ];

  const inputNumber = (num) => {
    if (displayValue === 'Error') {
      return;
    }

    if (waitingForOperand) {
      setDisplayValue(String(num));
      setWaitingForOperand(false);
    } else {
      const newValue = displayValue === '0' ? String(num) : displayValue + num;
      // Prevent input if the display would be too long (excluding commas and decimal point)
      const cleanValue = newValue.replace(/[,.-]/g, '');
      if (cleanValue.length <= 9) {
        setDisplayValue(newValue);
      }
    }
  };

  const inputDecimal = () => {
    if (displayValue === 'Error') {
      return;
    }

    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    if (displayValue !== '0') {
      setDisplayValue(
        displayValue.charAt(0) === '-' 
          ? displayValue.substr(1) 
          : '-' + displayValue
      );
    }
  };

  const inputPercentage = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      if (newValue === 'Error') {
        setDisplayValue('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplayValue(String(newValue));
      setPreviousValue(parseFloat(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      if (newValue === 'Error') {
        setDisplayValue('Error');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplayValue(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleButtonPress = (value) => {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        inputNumber(parseInt(value, 10));
        break;

      case '.':
        inputDecimal();
        break;

      case 'AC':
      case 'C':
        clear();
        break;

      case '±':
        toggleSign();
        break;

      case '%':
        inputPercentage();
        break;

      case '=':
        performEquals();
        break;

      case '+':
      case '-':
      case '×':
      case '÷':
        performOperation(value);
        break;

      default:
        break;
    }
  };

  const getClearLabel = () => {
    return displayValue !== '0' || previousValue !== null || operation !== null ? 'C' : 'AC';
  };

  const isOperationActive = (op) => {
    return operation === op && waitingForOperand;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculatorWrapper}>
        <Display value={displayValue} />
        <View style={styles.buttonContainer}>
          {buttonLayout.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((button, buttonIndex) => {
                let buttonDisplayValue = button.value;
                
                // Show AC/C dynamically
                if (button.value === 'AC') {
                  buttonDisplayValue = getClearLabel();
                }
                
                return (
                  <CalculatorButton
                    key={buttonIndex}
                    value={buttonDisplayValue}
                    type={button.type}
                    onPress={handleButtonPress}
                    isActive={isOperationActive(button.value)}
                    isWide={button.isWide}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Calculator;