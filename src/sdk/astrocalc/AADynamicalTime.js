import {DT} from './AADate';
import ss from '../scriptsharp/ss';
import GFX from './GFX';

export const DYT = {
  deltaT: JD => {
    const date = DT.createJD(JD, DT.afterPapalReformJD(JD));
    let y = date.fractionalYear();
    const T = (y - 2000) / 100;
    let Delta;
    if (y < 948) {
      Delta = 2177 + (497 * T) + (44.1 * T * T);
    } else if (y < 1620) {
      Delta = 102 + (102 * T) + (25.3 * T * T);
    } else if (y < 1998) {
      const Index = ss.truncate(((y - 1620) / 2));
      console.assert(Index < GFX.deltaTTable.length);
      y = y / 2 - Index - 810;
      Delta = (GFX.deltaTTable[Index] + (GFX.deltaTTable[Index + 1] - GFX.deltaTTable[Index]) * y);
    } else if (y <= 2000) {
      const nLookupSize = GFX.deltaTTable.length;
      Delta = GFX.deltaTTable[nLookupSize - 1];
    } else if (y < 2100) {
      Delta = 102 + (102 * T) + (25.3 * T * T) + 0.37 * (y - 2100);
    } else {
      Delta = 102 + (102 * T) + (25.3 * T * T);
    }
    return Delta;
  }
};