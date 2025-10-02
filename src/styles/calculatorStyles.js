import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const buttonSize = Math.min((screenWidth - 50) / 4, 90); // 4 buttons with spacing, max 90

export const COLORS = {
  background: '#000000',
  displayText: '#FFFFFF',
  numberButton: '#333333',
  numberButtonText: '#FFFFFF',
  functionButton: '#A5A5A5',
  functionButtonText: '#000000',
  operationButton: '#FF9F0A',
  operationButtonText: '#FFFFFF',
  operationButtonActive: '#FFFFFF',
  operationButtonActiveText: '#FF9F0A',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: 10,
  },
  displayText: {
    fontSize: 70,
    color: COLORS.displayText,
    fontWeight: '200',
  },
  displayTextSmall: {
    fontSize: 50,
    color: COLORS.displayText,
    fontWeight: '200',
  },
  displayTextTiny: {
    fontSize: 35,
    color: COLORS.displayText,
    fontWeight: '200',
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton: {
    width: buttonSize * 2 + 10, // Double width plus spacing
    alignItems: 'flex-start',
    paddingLeft: 30,
    borderRadius: buttonSize / 2,
  },
  buttonText: {
    fontSize: 35,
    fontWeight: '400',
  },
  numberButton: {
    backgroundColor: COLORS.numberButton,
  },
  numberButtonText: {
    color: COLORS.numberButtonText,
  },
  functionButton: {
    backgroundColor: COLORS.functionButton,
  },
  functionButtonText: {
    color: COLORS.functionButtonText,
    fontSize: 30,
  },
  operationButton: {
    backgroundColor: COLORS.operationButton,
  },
  operationButtonText: {
    color: COLORS.operationButtonText,
    fontSize: 40,
  },
  operationButtonActive: {
    backgroundColor: COLORS.operationButtonActive,
  },
  operationButtonActiveText: {
    color: COLORS.operationButtonActiveText,
    fontSize: 40,
  },
});