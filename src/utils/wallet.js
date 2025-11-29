/**
 * Wallet utility functions for frontend
 */

/**
 * Format wallet address for display (show first 6 and last 4 characters)
 */
export const formatWalletAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Copy address to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

