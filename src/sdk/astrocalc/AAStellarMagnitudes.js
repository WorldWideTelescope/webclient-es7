import {Util} from '../Util';

export const CAAStellarMagnitudes = {
  combinedMagnitude: function (m1, m2) {
    const x = 0.4 * (m2 - m1);
    return m2 - 2.5 * Util.log10(Math.pow(10, x) + 1);
  },
  combinedMagnitude2: function (Magnitudes, pMagnitudes) {
    let vvalue = 0;
    for (let i = 0; i < Magnitudes; i++) {
      vvalue += Math.pow(10, -0.4 * pMagnitudes[i]);
    }
    return -2.5 * Util.log10(vvalue);
  },
  brightnessRatio: function (m1, m2) {
    const x = 0.4 * (m2 - m1);
    return Math.pow(10, x);
  },
  magnitudeDifference: function (brightnessRatio) {
    return 2.5 * Util.log10(brightnessRatio);
  }
};
