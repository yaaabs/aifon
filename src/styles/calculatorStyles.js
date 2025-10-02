import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Better responsive detection - ONLY apply web styling to actual desktop web browsers
const isDesktopWeb = Platform.OS === 'web' && screenWidth > 1024;
const isTabletWeb = Platform.OS === 'web' && screenWidth > 768 && screenWidth <= 1024;
const isMobile = Platform.OS !== 'web' || screenWidth <= 768;

// Calculator width: FULL width for mobile, constrained for desktop/tablet web
const calculatorWidth = (() => {
  if (isMobile) return screenWidth; // Always full width for mobile
  if (isTabletWeb) return Math.min(600, screenWidth * 0.8);
  return Math.min(400, screenWidth * 0.5); // Desktop web
})();

// Button size: Better mobile calculation to prevent overflow
const buttonSize = (() => {
  if (isMobile) {
    // More conservative mobile calculation with proper margins
    const availableWidth = screenWidth - 40; // Account for container padding
    const buttonWidth = Math.floor(availableWidth / 4.5); // Leave space between buttons
    return Math.min(buttonWidth, 85);
  }
  if (isTabletWeb) return Math.min((calculatorWidth - 50) / 4, 100);
  return Math.min((calculatorWidth - 50) / 4, 85); // Desktop web
})();

// Font sizes: Better responsive scaling for all mobile sizes
const getDisplayFontSize = () => {
  if (isMobile) {
    // Better mobile scaling that works on all screen sizes
    const baseFontSize = Math.min(screenWidth * 0.15, 70);
    return Math.max(baseFontSize, 32); // Minimum font size for readability
  }
  if (isTabletWeb) return 65;
  return 55; // Desktop web
};

const getButtonFontSize = () => {
  if (isMobile) {
    // Better mobile scaling with minimum size for small screens
    const baseFontSize = Math.min(screenWidth * 0.08, 36);
    return Math.max(baseFontSize, 20); // Minimum font size for small screens
  }
  if (isTabletWeb) return 32;
  return 28; // Desktop web
};

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
    // Prevent horizontal scroll and ensure full coverage
    ...(isMobile && {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }),
    // Only center and constrain on web (tablet/desktop), mobile stays full-screen
    ...(!isMobile && {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }),
  },
  calculatorWrapper: {
    width: calculatorWidth,
    height: isMobile ? '100%' : Math.min(screenHeight * 0.9, 700),
    backgroundColor: COLORS.background,
    // Ensure no overflow on mobile
    ...(isMobile && {
      maxWidth: '100%',
      overflow: 'hidden',
    }),
    // Only add web styling to non-mobile screens
    ...(!isMobile && {
      borderRadius: 25,
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    }),
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: 10,
  },
  displayText: {
    fontSize: getDisplayFontSize(),
    color: COLORS.displayText,
    fontWeight: '300',
  },
  equationText: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.06, 28);
        return Math.max(size, 16); // Minimum for small screens
      }
      if (isTabletWeb) return 24;
      return 20; // Desktop web
    })(),
    color: COLORS.displayText,
    fontWeight: '300',
    opacity: 0.7,
    marginBottom: 5,
    textAlign: 'right',
  },
  displayTextSmall: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.11, 55);
        return Math.max(size, 28); // Minimum for readability
      }
      if (isTabletWeb) return 50;
      return 42;
    })(),
    color: COLORS.displayText,
    fontWeight: '300',
  },
  displayTextTiny: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.07, 35);
        return Math.max(size, 22); // Minimum for readability
      }
      if (isTabletWeb) return 38;
      return 30;
    })(),
    color: COLORS.displayText,
    fontWeight: '300',
  },
  buttonContainer: {
    paddingBottom: isMobile ? 10 : 20,
    paddingHorizontal: isMobile ? 15 : 10,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? 8 : 10,
    paddingHorizontal: isMobile ? 5 : 0,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'all 0.1s ease',
    }),
  },
  wideButton: {
    width: isMobile 
      ? buttonSize * 2.1 + (isMobile ? 8 : 10) // Better mobile spacing
      : buttonSize * 2 + 10,
    alignItems: 'flex-start',
    paddingLeft: isMobile ? 25 : 30,
    borderRadius: buttonSize / 2,
  },
  buttonText: {
    fontSize: getButtonFontSize(),
    fontWeight: '500',
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
    fontWeight: '600',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.07, 32);
        return Math.max(size, 18); // Minimum for small screens
      }
      if (isTabletWeb) return 28;
      return 24;
    })(),
  },
  operationButton: {
    backgroundColor: COLORS.operationButton,
  },
  operationButtonText: {
    color: COLORS.operationButtonText,
    fontWeight: '500',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.09, 42);
        return Math.max(size, 22); // Minimum for small screens
      }
      if (isTabletWeb) return 36;
      return 32;
    })(),
  },
  operationButtonActive: {
    backgroundColor: COLORS.operationButtonActive,
  },
  operationButtonActiveText: {
    color: COLORS.operationButtonActiveText,
    fontWeight: '500',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.09, 42);
        return Math.max(size, 22); // Minimum for small screens
      }
      if (isTabletWeb) return 36;
      return 32;
    })(),
  },
});