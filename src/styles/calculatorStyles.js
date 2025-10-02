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
    // Large but balanced display font
    const baseFontSize = Math.min(screenWidth * 0.18, 80);
    return Math.max(baseFontSize, 42); // Large but reasonable
  }
  if (isTabletWeb) return 70;
  return 64; // Desktop web
};

const getButtonFontSize = () => {
  if (isMobile) {
    // Balanced font size - large but not breaking symbols
    const baseFontSize = Math.min(screenWidth * 0.10, 42);
    return Math.max(baseFontSize, 28); // Reasonable size for symbols
  }
  if (isTabletWeb) return 38;
  return 36; // Desktop web
};

export const COLORS = {
  background: '#000000',
  displayText: '#FEFEFE',
  numberButton: '#303030', // Dark gray for numbers
  numberButtonText: '#FEFEFE', // Off-white
  functionButton: '#5B5B5B', // Medium gray for delete, C, %
  functionButtonText: '#FEFEFE', // Off-white
  operationButton: '#FF9201', // Orange for operations
  operationButtonText: '#FEFEFE', // Off-white
  operationButtonActive: '#FEFEFE', // White when active
  operationButtonActiveText: '#FF9201', // Orange text when active
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
    color: '#FEFEFE', // Off-white
    fontWeight: '600', // Much bolder for better visibility
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },
  equationText: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.12, 48); // Even larger equation text
        return Math.max(size, 30);
      }
      if (isTabletWeb) return 38;
      return 34;
    })(),
    color: '#FEFEFE', // Off-white
    fontWeight: '500', // Bolder for better visibility
    opacity: 0.8, // Less transparent for better visibility
    marginBottom: 8,
    textAlign: 'right',
    letterSpacing: 0.5,
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    // Prevent line wrapping - force horizontal display like iPhone
    flexShrink: 1,
    width: '100%',
  },
  equationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.11, 44); // Larger equation container
        return Math.max(size, 30) + 8;
      }
      if (isTabletWeb) return 42;
      return 38;
    })(),
  },
  equationPlaceholder: {
    height: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.08, 32);
        return Math.max(size, 20) + 8;
      }
      if (isTabletWeb) return 36;
      return 32;
    })(),
  },
  displayTextSmall: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.15, 70);
        return Math.max(size, 36); // Larger for iPhone style
      }
      if (isTabletWeb) return 62;
      return 54;
    })(),
    color: '#FFFFFF',
    fontWeight: '200',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },
  displayTextTiny: {
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.1, 50);
        return Math.max(size, 30); // Larger for iPhone style
      }
      if (isTabletWeb) return 46;
      return 38;
    })(),
    color: '#FFFFFF',
    fontWeight: '200',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
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
    fontWeight: '600', // Bolder weight for better visibility
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', // iPhone-style font
    color: '#FEFEFE', // Off-white
  },
  numberButton: {
    backgroundColor: COLORS.numberButton,
  },
  numberButtonText: {
    color: '#FEFEFE', // Off-white
    fontWeight: '600', // Bolder weight for better visibility
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  },
  functionButton: {
    backgroundColor: COLORS.functionButton,
  },
  functionButtonText: {
    color: '#FEFEFE', // Off-white for delete, C, % buttons
    fontWeight: '600', // Bolder weight
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.065, 28); // Even smaller for +/- symbol
        return Math.max(size, 20);
      }
      if (isTabletWeb) return 26;
      return 24;
    })(),
  },
  operationButton: {
    backgroundColor: COLORS.operationButton,
  },
  operationButtonText: {
    color: '#FEFEFE', // Off-white
    fontWeight: '600', // Bolder weight for better visibility
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.11, 48); // More reasonable operation symbols
        return Math.max(size, 30);
      }
      if (isTabletWeb) return 40;
      return 38;
    })(),
  },
  operationButtonActive: {
    backgroundColor: COLORS.operationButtonActive,
  },
  operationButtonActiveText: {
    color: '#FF9201', // Orange text when button is active
    fontWeight: '600', // Bolder weight for better visibility
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: (() => {
      if (isMobile) {
        const size = Math.min(screenWidth * 0.11, 48); // More reasonable operation symbols
        return Math.max(size, 30);
      }
      if (isTabletWeb) return 40;
      return 38;
    })(),
  },
});