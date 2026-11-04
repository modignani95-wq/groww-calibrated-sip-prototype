// Financial Math & SIP Compound Arithmetic Engine

export const calculator = {
  /**
   * Calculate future value of a Monthly SIP
   * Formula: FV = P * [ ((1 + r)^n - 1) / r ] * (1 + r)
   * @param {number} monthlyAmount - Monthly SIP in ₹
   * @param {number} annualCagr - Annual rate in percent (e.g. 24.6)
   * @param {number} months - Total duration in months
   */
  calculateSipFutureValue(monthlyAmount, annualCagr, months) {
    if (!monthlyAmount || months <= 0) return 0;
    const monthlyRate = (annualCagr / 100) / 12;
    const compoundFactor = Math.pow(1 + monthlyRate, months) - 1;
    const futureValue = monthlyAmount * (compoundFactor / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  },

  /**
   * Calculate 80/20 split for Crisis Buffer
   * @param {number} totalAmount 
   * @param {boolean} isBufferEnabled 
   */
  calculateSplit(totalAmount, isBufferEnabled) {
    if (!isBufferEnabled) {
      return {
        equityAmount: totalAmount,
        bufferAmount: 0,
        equityPercent: 100,
        bufferPercent: 0
      };
    }
    const bufferAmount = Math.round(totalAmount * 0.20);
    const equityAmount = totalAmount - bufferAmount;
    return {
      equityAmount,
      bufferAmount,
      equityPercent: 80,
      bufferPercent: 20
    };
  },

  /**
   * Format numbers into Indian Rupees currency format
   * @param {number} amount 
   */
  formatRupees(amount) {
    if (isNaN(amount)) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  },

  /**
   * Format large numbers into Lakhs / Crores string (e.g. ₹1.82 Lakh)
   * @param {number} amount 
   */
  formatCorpusLakhs(amount) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

