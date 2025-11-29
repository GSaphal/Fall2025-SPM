/**
 * Wallet utility functions for frontend
 */
import { ethers } from 'ethers';

/**
 * Create a wallet using ethers.js (client-side)
 * Note: This creates a wallet in the browser. For production, 
 * wallets should be created server-side and encrypted.
 */
export const createWalletClientSide = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey // In production, never expose this
  };
};

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

