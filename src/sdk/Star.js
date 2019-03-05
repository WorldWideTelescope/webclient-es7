import ss from './scriptsharp/ss';
import {Coordinates} from './Coordinates';
import {Place} from './Place';
import {Constellations} from './Constellation';
import {Color} from './Color';
import {Util} from './Util';

export class Star{
  constructor(input) {
    this.magnitude = 0;
    this.RA = 0;
    this.dec = 0;
    this.BMV = 0;
    this.id = 0;
    this.absoluteMagnitude = 0;
    this.par = 0;
    this.distance = 0;
    const sa = input.split('\t');
    this.id = parseInt(ss.replaceString(sa[0], 'HIP', ''));
    this.dec = parseFloat(sa[3]);
    this.RA = parseFloat(sa[2]) / 15;
    if (sa.length > 4) {
      try {
        if (sa[4].toUpperCase() !== 'NULL' && !!sa[4]) {
          this.magnitude = parseFloat(sa[4]);
        }
      }
      catch ($e1) {
      }
    }
    if (sa.length > 5) {
      try {
        this.BMV = parseFloat(sa[5]);
        this._makeColor(this.BMV);
      }
      catch ($e2) {
      }
    }
    if (sa.length > 6) {
      this.par = parseFloat(sa[6]);
      this._makeDistanceAndMagnitude();
    }
  }
  get_name() {
    return 'HIP' + this.id.toString();
  }
  get_coordinates() {
    return Coordinates.fromRaDec(this.RA, this.dec);
  }
  get_asPlace() {
    const place = Place.create(this.get_name(), this.dec, this.RA, 1, Constellations.containment.findConstellationForPoint(this.RA, this.dec), 4, -1);
    place.set_magnitude(this.magnitude);
    place.set_distance(this.distance);
    return place;
  }
  stars(input, newish) {
    const sa = input.split('\t');
    this.id = parseInt(sa[0]);
    this.RA = parseFloat(sa[1]) / 15;
    this.dec = parseFloat(sa[2]);
    if (sa.length > 3) {
      try {
        this.magnitude = parseFloat(sa[3]);
      } catch ($e1) {
      }
    }
    if (sa.length > 4) {
      try {
        this.col = Color.load(sa[4]);
      } catch ($e2) {
      }
    }
  }
  _makeDistanceAndMagnitude() {
    this.distance = 1 / (this.par / 1000);
    this.absoluteMagnitude = this.magnitude - 5 * (Util.logN(this.distance, 10) - 1);
    this.distance *= 206264.806;
  }
  _makeColor(bmv) {
    let c = 4294967295;
    if (bmv <= -0.32) {
      c = 4288854271;
    } else if (bmv <= -0.31) {
      c = 4288919807;
    } else if (bmv <= -0.3) {
      c = 4288985855;
    } else if (bmv <= -0.3) {
      c = 4289051391;
    } else if (bmv <= -0.28) {
      c = 4289182975;
    } else if (bmv <= -0.26) {
      c = 4289314303;
    } else if (bmv <= -0.24) {
      c = 4289445887;
    } else if (bmv <= -0.2) {
      c = 4289708799;
    } else if (bmv <= -0.16) {
      c = 4290037503;
    } else if (bmv <= -0.14) {
      c = 4290169087;
    } else if (bmv <= -0.12) {
      c = 4290366207;
    } else if (bmv <= -0.09) {
      c = 4290563583;
    } else if (bmv <= -0.06) {
      c = 4290892031;
    } else if (bmv <= 0) {
      c = 4291483391;
    } else if (bmv <= 0.06) {
      c = 4292009215;
    } else if (bmv <= 0.14) {
      c = 4292732159;
    } else if (bmv <= 0.19) {
      c = 4293126399;
    } else if (bmv <= 0.31) {
      c = 4294111999;
    } else if (bmv <= 0.36) {
      c = 4294571775;
    } else if (bmv <= 0.43) {
      c = 4294965756;
    } else if (bmv <= 0.54) {
      c = 4294964979;
    } else if (bmv <= 0.59) {
      c = 4294964203;
    } else if (bmv <= 0.63) {
      c = 4294963687;
    } else if (bmv <= 0.66) {
      c = 4294963169;
    } else if (bmv <= 0.74) {
      c = 4294962909;
    } else if (bmv <= 0.82) {
      c = 4294961877;
    } else if (bmv <= 0.92) {
      c = 4294960324;
    } else if (bmv <= 1.15) {
      c = 4294959032;
    } else if (bmv <= 1.3) {
      c = 4294958516;
    } else if (bmv <= 1.41) {
      c = 4294955933;
    } else if (bmv <= 1.48) {
      c = 4294954385;
    } else if (bmv <= 1.52) {
      c = 4294953351;
    } else if (bmv <= 1.55) {
      c = 4294952319;
    } else if (bmv <= 1.56) {
      c = 4294951287;
    } else if (bmv <= 1.61) {
      c = 4294950257;
    } else if (bmv <= 1.72) {
      c = 4294948966;
    } else if (bmv <= 1.84) {
      c = 4294947419;
    } else if (bmv <= 2) {
      c = 4294946129;
    }
    this.col = Color.fromInt(c);
  }
};


export class Galaxy{
  constructor(br) {
    this.RA = 0;
    this.dec = 0;
    this.distance = 0;
    this.type = 0;
    this.eTypeBucket = 0;
    this.size = 5;
    this.sdssID = 0;
    this.sdssID = br.readInt64();
    this.RA = br.readSingle();
    this.dec = br.readSingle();
    this.distance = br.readSingle();
    this.eTypeBucket = br.readByte();
    this.size = br.readSingle();
  }
  static getEType (value) {
    let a = 0;
    let b = Galaxy._eTypeBuckets.length - 1;
    while (b - a > 1) {
      const m = (a + b) / 2;
      if (value > Galaxy._eTypeBuckets[m]) {
        a = m;
      } else {
        b = m;
      }
    }
    return a;
  }
}

