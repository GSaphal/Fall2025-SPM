import React from 'react';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const BlockchainVerification = () => {
  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-green-100/50">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-3 rounded-xl flex-shrink-0 shadow-sm">
          <FaShieldAlt className="text-green-600" size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-800 text-base">Blockchain Verified</h4>
            <FaCheckCircle className="text-green-400" size={16} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            All savings transactions are recorded on Polygon blockchain for transparency and security
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockchainVerification;

