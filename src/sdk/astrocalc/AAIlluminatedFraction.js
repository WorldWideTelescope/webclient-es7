import {CT} from './AACoordinateTransformation';
import {Util} from '../Util';

export const IFR = {
  phaseAngle: (r, R, Delta) => CT.m360(CT.r2D(Math.acos((r * r + Delta * Delta - R * R) / (2 * r * Delta)))),
  phaseAngle2: (R, R0, B, L, L0, Delta) => {
    B = CT.d2R(B);
    L = CT.d2R(L);
    L0 = CT.d2R(L0);
    return CT.m360(CT.r2D(Math.acos((R - R0 * Math.cos(B) * Math.cos(L - L0)) / Delta)));
  },
  phaseAngleRectangular: (x, y, z, B, L, Delta) => {
    B = CT.d2R(B);
    L = CT.d2R(L);
    const cosB = Math.cos(B);
    return CT.m360(CT.r2D(Math.acos((x * cosB * Math.cos(L) + y * cosB * Math.sin(L) + z * Math.sin(B)) / Delta)));
  },
  illuminatedFraction: PhaseAngle => {
    PhaseAngle = CT.d2R(PhaseAngle);
    return (1 + Math.cos(PhaseAngle)) / 2;
  },
  illuminatedFraction2: (r, R, Delta) => (((r + Delta) * (r + Delta) - R * R) / (4 * r * Delta)),
  mercuryMagnitudeMuller: (r, Delta, i) => {
    const I_50 = i - 50;
    return 1.16 + 5 * Util.log10(r * Delta) + 0.02838 * I_50 + 0.0001023 * I_50 * I_50;
  },
  venusMagnitudeMuller: (r, Delta, i) => -4 + 5 * Util.log10(r * Delta) + 0.01322 * i + 4.247E-07 * i * i * i,
  marsMagnitudeMuller: (r, Delta, i) => -1.3 + 5 * Util.log10(r * Delta) + 0.01486 * i,
  jupiterMagnitudeMuller: (r, Delta) => -8.93 + 5 * Util.log10(r * Delta),
  saturnMagnitudeMuller: (r, Delta, DeltaU, B) => {
    B = CT.d2R(B);
    const sinB = Math.sin(B);
    return -8.68 + 5 * Util.log10(r * Delta) + 0.044 * Math.abs(DeltaU) - 2.6 * Math.sin(Math.abs(B)) + 1.25 * sinB * sinB;
  },
  uranusMagnitudeMuller: (r, Delta) => -6.85 + 5 * Util.log10(r * Delta),
  neptuneMagnitudeMuller: (r, Delta) => -7.05 + 5 * Util.log10(r * Delta),
  mercuryMagnitudeAA: (r, Delta, i) => {
    const i2 = i * i;
    const i3 = i2 * i;
    return -0.42 + 5 * Util.log10(r * Delta) + 0.038 * i - 0.000273 * i2 + 2E-06 * i3;
  },
  venusMagnitudeAA: (r, Delta, i) => {
    const i2 = i * i;
    const i3 = i2 * i;
    return -4.4 + 5 * Util.log10(r * Delta) + 0.0009 * i + 0.000239 * i2 - 6.5E-07 * i3;
  },
  marsMagnitudeAA: (r, Delta, i) => -1.52 + 5 * Util.log10(r * Delta) + 0.016 * i,
  jupiterMagnitudeAA: (r, Delta, i) => -9.4 + 5 * Util.log10(r * Delta) + 0.005 * i,
  saturnMagnitudeAA: (r, Delta, DeltaU, B) => {
    B = CT.d2R(B);
    const sinB = Math.sin(B);
    return -8.88 + 5 * Util.log10(r * Delta) + 0.044 * Math.abs(DeltaU) - 2.6 * Math.sin(Math.abs(B)) + 1.25 * sinB * sinB;
  },
  uranusMagnitudeAA: (r, Delta) => -7.19 + 5 * Util.log10(r * Delta),
  neptuneMagnitudeAA: (r, Delta) => -6.87 + 5 * Util.log10(r * Delta),
  plutoMagnitudeAA: (r, Delta) => -1 + 5 * Util.log10(r * Delta)
};
