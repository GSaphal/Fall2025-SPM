import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaCoins, FaTrophy, FaMedal, FaStar, FaAward, FaMagic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, SHAPE, SIZE } from 'baseui/button';

const ReceiptScanned = ({ receiptImage, receiptAmount = 0, onComplete }) => {
  const navigate = useNavigate();
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [phase, setPhase] = useState('scanning'); // 'scanning', 'points', 'achievements', 'complete'
  const [receiptTotal, setReceiptTotal] = useState(receiptAmount);

  // Available achievements to unlock
  const availableAchievements = [
    {
      id: 1,
      name: 'First Scan',
      description: 'Scanned your first receipt',
      icon: FaStar,
      points: 50,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      unlocked: false,
    },
    {
      id: 2,
      name: 'Receipt Master',
      description: 'Scanned 5 receipts',
      icon: FaMedal,
      points: 100,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      unlocked: false,
    },
    {
      id: 3,
      name: 'Point Collector',
      description: 'Earned 200 points',
      icon: FaTrophy,
      points: 150,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      unlocked: false,
    },
    {
      id: 4,
      name: 'Smart Saver',
      description: 'Found 3 deals',
      icon: FaAward,
      points: 75,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      unlocked: false,
    },
  ];

  useEffect(() => {
    // Phase 1: Scanning animation (2 seconds)
    const scanningTimer = setTimeout(() => {
      setPhase('points');
    }, 2000);

    return () => clearTimeout(scanningTimer);
  }, []);

  useEffect(() => {
    if (phase === 'points') {
      // Phase 2: Calculate points based on receipt amount
      // Formula based on Dollarama receipt example ($27.25):
      // - Base: 1 point per dollar (rounded down)
      // - Minimum: 5 points for any receipt
      // - Bonus tiers:
      //   - $20-$40: +5 bonus points
      //   - $40-$60: +10 bonus points
      //   - $60+: +15 bonus points
      const basePoints = Math.max(5, Math.floor(receiptTotal)); // At least 5 points, 1 point per dollar
      let bonusPoints = 0;
      if (receiptTotal >= 60) {
        bonusPoints = 15;
      } else if (receiptTotal >= 40) {
        bonusPoints = 10;
      } else if (receiptTotal >= 20) {
        bonusPoints = 5;
      }
      const receiptPoints = basePoints + bonusPoints;
      const total = receiptPoints;
      setTotalPoints(total);

      // Animate points counting up
      let current = 0;
      const increment = total / 30; // 30 steps
      const pointsTimer = setInterval(() => {
        current += increment;
        if (current >= total) {
          setCurrentPoints(total);
          clearInterval(pointsTimer);
          // Move to achievements phase after a short delay
          setTimeout(() => {
            setPhase('achievements');
          }, 500);
        } else {
          setCurrentPoints(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(pointsTimer);
    }
  }, [phase, receiptTotal]);

  useEffect(() => {
    if (phase === 'achievements') {
      // Phase 3: Unlock achievements one by one
      const achievementsToUnlock = availableAchievements.slice(0, 2); // Unlock first 2 achievements
      let index = 0;

      const unlockAchievement = () => {
        if (index < achievementsToUnlock.length) {
          const achievement = achievementsToUnlock[index];
          setAchievements((prev) => [...prev, { ...achievement, unlocked: true }]);
          setTotalPoints((prev) => prev + achievement.points);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 1000);
          index++;
          setTimeout(unlockAchievement, 1500);
        } else {
          // All achievements unlocked, move to complete phase
          setTimeout(() => {
            setPhase('complete');
          }, 1000);
        }
      };

      const achievementTimer = setTimeout(() => {
        unlockAchievement();
      }, 500);

      return () => clearTimeout(achievementTimer);
    }
  }, [phase]);

  const handleContinue = () => {
    if (onComplete) {
      onComplete(Math.floor(currentPoints), receiptTotal);
    }
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 max-w-sm mx-auto">
      {/* Receipt Image Preview */}
      {receiptImage && (
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={receiptImage}
            alt="Scanned receipt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Scanning Phase */}
        <AnimatePresence mode="wait">
          {phase === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <FaMagic className="text-4xl text-gray-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Scanning Receipt...</h2>
              <p className="text-gray-600">Analyzing your purchase</p>
              {receiptTotal > 0 && (
                <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-600">Receipt Total</p>
                  <p className="text-2xl font-bold text-gray-800">${receiptTotal.toFixed(2)}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Points Phase */}
          {phase === 'points' && (
            <motion.div
              key="points"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mb-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-sm">
                  <FaCoins className="text-6xl text-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Points Earned!</h2>
                  {receiptTotal > 0 && (
                    <div className="mb-3 bg-white rounded-lg p-2 border border-green-200">
                      <p className="text-xs text-gray-600 mb-1">Receipt Amount</p>
                      <p className="text-lg font-semibold text-gray-800">${receiptTotal.toFixed(2)}</p>
                    </div>
                  )}
                  <motion.div
                    key={currentPoints}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-bold text-green-600 mb-2"
                  >
                    +{Math.floor(currentPoints)}
                  </motion.div>
                  <p className="text-gray-600">Keep scanning to earn more!</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Achievements Phase */}
          {phase === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Achievement Unlocked! 🎉</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <FaTrophy className="text-4xl text-yellow-500" />
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentPoints / 200) * 100}%` }}
                    className="h-2 bg-green-200 rounded-full"
                  />
                </div>
                <p className="text-gray-600">Total Points: {Math.floor(currentPoints)}</p>
              </div>

              <AnimatePresence>
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50 }}
                      className={`${achievement.bgColor} rounded-xl p-4 border-2 border-gray-300 shadow-lg`}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className={`${achievement.color} bg-white p-3 rounded-xl shadow-sm`}
                        >
                          <Icon size={32} />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900">{achievement.name}</h4>
                            <FaCheckCircle className="text-green-500" size={16} />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-2">
                            <FaCoins className="text-yellow-500" size={14} />
                            <span className="text-sm font-semibold text-gray-700">
                              +{achievement.points} points
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Complete Phase */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-sm">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Receipt Saved!</h2>
                  <div className="text-4xl font-bold text-green-600 mb-4">
                    {Math.floor(currentPoints)} Points
                  </div>
                  <p className="text-gray-600 mb-6">
                    Great job! Your receipt has been processed and points have been added to your account.
                  </p>
                  <Button
                    onClick={handleContinue}
                    shape={SHAPE.pill}
                    size={SIZE.large}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-semibold w-full"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </motion.div>

              {/* Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receipt Amount</span>
                    <span className="font-semibold text-gray-800">${receiptTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receipt Points</span>
                    <span className="font-semibold text-gray-800">
                      +{Math.floor(currentPoints - achievements.reduce((sum, a) => sum + a.points, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Achievement Bonuses</span>
                    <span className="font-semibold text-gray-800">
                      +{achievements.reduce((sum, a) => sum + a.points, 0)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-800">Total Earned</span>
                      <span className="font-bold text-green-600">
                        +{Math.floor(currentPoints)} Points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Effect */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              exit={{ scale: 0 }}
              className="text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReceiptScanned;

