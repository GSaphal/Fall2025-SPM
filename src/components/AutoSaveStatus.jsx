import React from 'react';
import { FaRobot, FaToggleOn, FaToggleOff, FaDollarSign } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';

const AutoSaveStatus = () => {
  const [autoSaveEnabled, setAutoSaveEnabled] = React.useState(true);
  const [surplusDetected, setSurplusDetected] = React.useState(true);

  return (
    <div className="w-full mb-6">
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-5 shadow-sm border border-green-100/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-3 rounded-xl shadow-sm">
              <FaRobot className="text-green-600 text-2xl" />
            </div>
            <div>
              <HeadingSmall className="text-gray-800 font-bold mb-1">AI Auto-Save</HeadingSmall>
              <p className="text-sm text-gray-600">Intelligent savings automation</p>
            </div>
          </div>
          <button
            onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
            className="text-4xl flex-shrink-0"
          >
            {autoSaveEnabled ? (
              <FaToggleOn className="text-green-400" />
            ) : (
              <FaToggleOff className="text-gray-300" />
            )}
          </button>
        </div>

        {autoSaveEnabled && (
          <div className="bg-white rounded-xl p-4 mt-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700 font-medium">Status</span>
              <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold border border-green-200">
                Active
              </span>
            </div>
            
            {surplusDetected && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
                    <FaDollarSign className="text-yellow-600" size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Surplus Detected</span>
                </div>
                <p className="text-xs text-gray-600 mb-2 ml-11">
                  AI detected $150 surplus this week
                </p>
                <div className="flex items-center justify-between ml-11">
                  <span className="text-xs text-gray-700 font-medium">Auto-saving: $50</span>
                  <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                    <span>✓</span> Scheduled
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {!autoSaveEnabled && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center mt-4">
            <p className="text-sm text-gray-600">Enable AI Auto-Save to automatically transfer surplus funds to savings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoSaveStatus;

