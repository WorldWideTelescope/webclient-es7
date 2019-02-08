import {CT} from './AACoordinateTransformation';

export function CAAMoonNodes() {}
CAAMoonNodes.k = function(Year) {
  return 13.4223 * (Year - 2000.05);
};
CAAMoonNodes.passageThroNode = function(k) {
  const T = k / 1342.23;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(183.638 + 331.73735682 * k + 0.0014852 * Tsquared + 2.09E-06 * Tcubed - 1E-08 * T4);
  let M = CT.m360(17.4006 + 26.8203725 * k + 0.0001186 * Tsquared + 6E-08 * Tcubed);
  let Mdash = CT.m360(38.3776 + 355.52747313 * k + 0.0123499 * Tsquared + 1.4627E-05 * Tcubed - 6.9E-08 * T4);
  let omega = CT.m360(123.9767 - 1.44098956 * k + 0.0020608 * Tsquared + 2.14E-06 * Tcubed - 1.6E-08 * T4);
  let V = CT.m360(299.75 + 132.85 * T - 0.009173 * Tsquared);
  let P = CT.m360(omega + 272.75 - 2.3 * T);
  const E = 1 - 0.002516 * T - 7.4E-06 * Tsquared;
  D = CT.d2R(D);
  const D2 = 2 * D;
  const D4 = D2 * D2;
  M = CT.d2R(M);
  Mdash = CT.d2R(Mdash);
  const Mdash2 = 2 * Mdash;
  omega = CT.d2R(omega);
  V = CT.d2R(V);
  P = CT.d2R(P);
  const JD = 2451565.1619 + 27.212220817 * k + 0.0002762 * Tsquared + 2.1E-08 * Tcubed - 8.8E-11 * T4 - 0.4721 * Math.sin(Mdash) - 0.1649 * Math.sin(D2) - 0.0868 * Math.sin(D2 - Mdash) + 0.0084 * Math.sin(D2 + Mdash) - E * 0.0083 * Math.sin(D2 - M) - E * 0.0039 * Math.sin(D2 - M - Mdash) + 0.0034 * Math.sin(Mdash2) - 0.0031 * Math.sin(D2 - Mdash2) + E * 0.003 * Math.sin(D2 + M) + E * 0.0028 * Math.sin(M - Mdash) + E * 0.0026 * Math.sin(M) + 0.0025 * Math.sin(D4) + 0.0024 * Math.sin(D) + E * 0.0022 * Math.sin(M + Mdash) + 0.0017 * Math.sin(omega) + 0.0014 * Math.sin(D4 - Mdash) + E * 0.0005 * Math.sin(D2 + M - Mdash) + E * 0.0004 * Math.sin(D2 - M + Mdash) - E * 0.0003 * Math.sin(D2 - M * M) + E * 0.0003 * Math.sin(D4 - M) + 0.0003 * Math.sin(V) + 0.0003 * Math.sin(P);
  return JD;
};
export const CAAMoonNodes$ = {};

