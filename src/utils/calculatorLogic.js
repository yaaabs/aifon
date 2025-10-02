// Pure calculation functions

export const calculate = (num1, num2, operation) => {
  const first = parseFloat(num1);
  const second = parseFloat(num2);

  switch (operation) {
    case '+':
      return (first + second).toString();
    case '-':
      return (first - second).toString();
    case '×':
      return (first * second).toString();
    case '÷':
      if (second === 0) {
        return 'Error';
      }
      return (first / second).toString();
    default:
      return num2;
  }
};

export const formatNumber = (value) => {
  if (value === 'Error' || value === '0') {
    return value;
  }

  // Convert to string if it's a number
  const stringValue = String(value);

  // Handle negative numbers
  const isNegative = stringValue.startsWith('-');
  const absoluteValue = isNegative ? stringValue.slice(1) : stringValue;

  // Check if it's a decimal
  const parts = absoluteValue.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // If number is too long, use scientific notation
  if (integerPart.length > 9) {
    const num = parseFloat(stringValue);
    return num.toExponential(5);
  }

  // For very small decimal numbers, also use scientific notation
  const num = parseFloat(stringValue);
  if (Math.abs(num) < 0.000001 && num !== 0) {
    return num.toExponential(5);
  }

  // Remove trailing zeros from decimal part
  let cleanDecimalPart = decimalPart;
  if (cleanDecimalPart) {
    cleanDecimalPart = cleanDecimalPart.replace(/0+$/, '');
  }

  // Add commas to integer part (only if no decimal or short decimal)
  let formattedInteger = integerPart;
  if (integerPart.length >= 4 && (!cleanDecimalPart || cleanDecimalPart.length <= 3)) {
    formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Combine with decimal if exists
  let result = formattedInteger;
  if (cleanDecimalPart && cleanDecimalPart.length > 0) {
    result += '.' + cleanDecimalPart;
  }

  // Add negative sign back if needed
  return isNegative ? '-' + result : result;
};

export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};