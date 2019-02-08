import {DT} from './AADate';
import ss from '../scriptsharp/ss';
import {CT} from './AACoordinateTransformation';
import {CAANutation} from './AANutation';

export function CAASidereal() {
}
CAASidereal.meanGreenwichSiderealTime = function(JD) {
  const date = new DT();
  date.setJD(JD, DT.afterPapalReformJD(JD));
  const D = date.get();
  const Year = ss.truncate(D[0]);
  const Month = ss.truncate(D[1]);
  const Day = ss.truncate(D[2]);
  const Hour = ss.truncate(D[3]);
  const Minute = ss.truncate(D[4]);
  const Second = D[5];
  date.set(Year, Month, Day, 0, 0, 0, date.inGregorianCalendar());
  const JDMidnight = date.julian();
  const T = (JDMidnight - 2451545) / 36525;
  const TSquared = T * T;
  const TCubed = TSquared * T;
  let Value = 100.46061837 + (36000.770053608 * T) + (0.000387933 * TSquared) - (TCubed / 38710000);
  Value += (((Hour * 15) + (Minute * 0.25) + (Second * 0.00416666666666667)) * 1.00273790935);
  Value = CT.d2H(Value);
  return CT.m24(Value);
};
CAASidereal.apparentGreenwichSiderealTime = function(JD) {
  const MeanObliquity = CAANutation.meanObliquityOfEcliptic(JD);
  const TrueObliquity = MeanObliquity + CAANutation.nutationInObliquity(JD) / 3600;
  const NutationInLongitude = CAANutation.nutationInLongitude(JD);
  const Value = CAASidereal.meanGreenwichSiderealTime(JD) + (NutationInLongitude * Math.cos(CT.d2R(TrueObliquity)) / 54000);
  return CT.m24(Value);
};