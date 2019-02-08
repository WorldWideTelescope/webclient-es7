import {CT} from './AACoordinateTransformation';
import {CAASun} from './AASun';
import {CAANutation} from './AANutation';

export const EOT = {
  calculate: function(JD) {
    const rho = (JD - 2451545) / 365250;
    const rhosquared = rho * rho;
    const rhocubed = rhosquared * rho;
    const rho4 = rhocubed * rho;
    const rho5 = rho4 * rho;
    const L0 = CT.m360(280.4664567 + 360007.6982779 * rho + 0.03032028 * rhosquared + rhocubed / 49931 - rho4 / 15300 - rho5 / 2000000);
    const SunLong = CAASun.apparentEclipticLongitude(JD);
    const SunLat = CAASun.apparentEclipticLatitude(JD);
    let epsilon = CAANutation.trueObliquityOfEcliptic(JD);
    const Equatorial = CT.ec2Eq(SunLong, SunLat, epsilon);
    epsilon = CT.d2R(epsilon);
    let E = L0 - 0.0057183 - Equatorial.x * 15 + CT.dmS2D(0, 0, CAANutation.nutationInLongitude(JD)) * Math.cos(epsilon);
    if (E > 180) {
      E = -(360 - E);
    }
    E *= 4;
    return E;
  }
};
