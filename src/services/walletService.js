/**
 * Wallet service for API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Create or get wallet for user
 */
export const createOrGetWallet = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create/get wallet');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating/getting wallet:', error);
    throw error;
  }
};

/**
 * Get user rewards
 */
export const getUserRewards = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${email}/rewards`);
    
    if (!response.ok) {
      throw new Error('Failed to get rewards');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting rewards:', error);
    throw error;
  }
};

/**
 * Update user rewards
 */
export const updateUserRewards = async (email, points) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${email}/rewards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update rewards');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating rewards:', error);
    throw error;
  }
};

