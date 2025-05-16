
// Helper function to detect card type based on first digits
export const getCardType = (cardNumber: string): string => {
  const firstDigit = cardNumber.charAt(0);
  const firstTwoDigits = cardNumber.substring(0, 2);
  
  if (firstDigit === '4') return 'Visa';
  if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'MasterCard';
  if (['34', '37'].includes(firstTwoDigits)) return 'American Express';
  if (['60', '65'].includes(firstTwoDigits)) return 'Discover';
  return 'Unknown';
};

// Helper function to format card expiry as MM/YY
export const formatCardExpiry = (input: string): string => {
  const cleaned = input.replace(/\D/g, '');
  
  if (cleaned.length > 2) {
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  }
  
  return cleaned;
};
