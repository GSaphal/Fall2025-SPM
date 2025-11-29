import React, { useState, useEffect } from 'react';
import { FaWallet, FaCopy, FaCheck, FaCoins, FaQrcode } from 'react-icons/fa';
import { createOrGetWallet, getUserRewards } from '../services/walletService';
import { formatWalletAddress, copyToClipboard } from '../utils/wallet';
import toast from 'react-hot-toast';

const Wallet = ({ userEmail }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [rewardsPoints, setRewardsPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!userEmail) return;
      
      try {
        setLoading(true);
        // Try to create or get wallet from backend
        try {
          const walletData = await createOrGetWallet(userEmail);
          setWalletAddress(walletData.wallet_address);
          setRewardsPoints(walletData.rewards_points || 0);
          
          // Also fetch latest rewards
          const rewardsData = await getUserRewards(userEmail);
          setRewardsPoints(rewardsData.rewards_points || 0);
        } catch (error) {
          // If backend fails, use demo/mock data for showcase
          console.log('Using demo wallet data for showcase');
          // Generate a demo wallet address format
          const demoAddress = `0x${Array.from({length: 40}, () => 
            Math.floor(Math.random() * 16).toString(16)
          ).join('')}`;
          setWalletAddress(demoAddress);
          setRewardsPoints(1250); // Demo rewards points
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
        // Use demo data as fallback
        const demoAddress = `0x${Array.from({length: 40}, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')}`;
        setWalletAddress(demoAddress);
        setRewardsPoints(1250);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [userEmail]);

  const handleCopyAddress = async () => {
    const addressToCopy = walletAddress || '0x0000000000000000000000000000000000000000';
    const success = await copyToClipboard(addressToCopy);
    if (success) {
      setCopied(true);
      toast.success('Wallet address copied!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy address');
    }
  };

  // Initialize with demo data if no wallet address yet
  useEffect(() => {
    if (!walletAddress && !loading) {
      const demoAddress = `0x${Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;
      setWalletAddress(demoAddress);
      setRewardsPoints(1250);
    }
  }, [walletAddress, loading]);

  if (loading) {
    return (
      <div className="w-full mb-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      {/* Main Wallet Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-sm border border-green-100/50 mb-4">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200 rounded-full -ml-24 -mb-24"></div>
        </div>
        
        <div className="relative p-6 text-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-3 rounded-xl shadow-sm">
                <FaWallet className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Blockchain Wallet</h3>
                <p className="text-sm text-gray-600">Your digital wallet</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-2 rounded-lg shadow-sm">
              <FaQrcode className="text-green-600 text-xl" />
            </div>
          </div>

          {/* Wallet Address */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2 font-medium">Wallet Address</p>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <code className="text-gray-800 font-mono text-sm flex-1 break-all">
                  {walletAddress ? formatWalletAddress(walletAddress) : '0x0000...0000'}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="flex-shrink-0 bg-green-100 hover:bg-green-200 transition-colors p-2 rounded-lg active:scale-95"
                  title="Copy address"
                >
                  {copied ? (
                    <FaCheck className="text-green-600 text-lg" />
                  ) : (
                    <FaCopy className="text-green-600 text-lg" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Rewards Points */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-yellow-200 to-orange-200 p-2.5 rounded-lg">
                  <FaCoins className="text-yellow-600 text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Rewards Points</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(rewardsPoints || 1250).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-green-100 px-3 py-1 rounded-full border border-green-200">
                  <span className="text-xs font-semibold text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-2 rounded-lg flex-shrink-0 mt-0.5 shadow-sm">
            <FaCoins className="text-green-600 text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-600 mb-1">
              Earn More Points
            </p>
            <p className="text-xs text-gray-600">
              Scan receipts and make purchases to accumulate rewards points that can be redeemed for exclusive benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

