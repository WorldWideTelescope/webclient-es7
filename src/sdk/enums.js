export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
};
export const EO = {
  SUN: 0,
  MERCURY: 1,
  VENUS: 2,
  MARS: 3,
  JUPITER: 4,
  SATURN: 5,
  URANUS: 6,
  NEPTUNE: 7,
  PLUTO: 8
};
export const CullMode = {
  none: 0,
  counterClockwise: 2,
  clockwise: 1
};
export const PointScaleTypes = {
  linear: 0,
  power: 1,
  log: 2,
  constant: 3,
  stellarMagnitude: 4
};
export const DataTypes = {
  byteT: 0,
  int16T: 1,
  int32T: 2,
  floatT: 3,
  doubleT: 4,
  none: 5
};
export const ScaleTypes = {
  linear: 0,
  log: 1,
  power: 2,
  squareRoot: 3,
  histogramEqualization: 4
};
export const AltUnits = {
  meters: 1,
  feet: 2,
  inches: 3,
  miles: 4,
  kilometers: 5,
  astronomicalUnits: 6,
  lightYears: 7,
  parsecs: 8,
  megaParsecs: 9,
  custom: 10
};
export const FadeType = {
  fadeIn: 1,
  fadeOut: 2,
  both: 3,
  none: 4
};
export const ReferenceFrames = {
  sky: 0,
  ecliptic: 1,
  galactic: 2,
  sun: 3,
  mercury: 4,
  venus: 5,
  earth: 6,
  mars: 7,
  jupiter: 8,
  saturn: 9,
  uranus: 10,
  neptune: 11,
  pluto: 12,
  moon: 13,
  io: 14,
  europa: 15,
  ganymede: 16,
  callisto: 17,
  custom: 18,
  identity: 19,
  sandbox: 20
};
export const ReferenceFrameTypes = {
  fixedSherical: 0,
  orbital: 1,
  trajectory: 2,
  synodic: 3
};
export const CoordinatesTypes = {
  spherical: 0,
  rectangular: 1,
  orbital: 2
};
export const AltTypes = {
  depth: 0,
  altitude: 1,
  distance: 2,
  seaLevel: 3,
  terrain: 4
};
export const MarkerMixes = {
  same_For_All: 0
};
export const ColorMaps = {
  same_For_All: 0,
  group_by_Values: 2,
  per_Column_Literal: 3
};
export const PlotTypes = {
  gaussian: 0,
  point: 1,
  circle: 2,
  square: 3,
  pushPin: 4,
  custom: 5
};
export const MarkerScales = {
  screen: 0,
  world: 1
};
export const RAUnits = {
  hours: 0,
  degrees: 1
};
export const Primitives = {
  voBoolean: 1,
  voBit: 2,
  voUnsignedByte: 3,
  voShort: 4,
  voInt: 5,
  voLong: 6,
  voChar: 7,
  voUnicodeChar: 8,
  voFloat: 9,
  voDouble: 10,
  voFloatComplex: 11,
  voDoubleComplex: 12,
  voUndefined: 13
};
export const Alignment = {
  center: 0,
  left: 1
};
export const StockSkyOverlayTypes = {
  empty: 0,
  equatorialGrid: 1,
  equatorialGridText: 2,
  galacticGrid: 3,
  galacticGridText: 4,
  eclipticGrid: 5,
  eclipticGridText: 6,
  eclipticOverview: 7,
  eclipticOverviewText: 8,
  precessionChart: 9,
  altAzGrid: 10,
  altAzGridText: 11,
  constellationFigures: 12,
  constellationBoundaries: 13,
  constellationFocusedOnly: 14,
  constellationNames: 15,
  constellationPictures: 16,
  fadeToBlack: 17,
  fadeToLogo: 18,
  fadeToGradient: 19,
  screenBroadcast: 20,
  fadeRemoteOnly: 21,
  skyGrids: 22,
  constellations: 23,
  solarSystemStars: 24,
  solarSystemMilkyWay: 25,
  solarSystemCosmos: 26,
  solarSystemOrbits: 27,
  solarSystemPlanets: 28,
  solarSystemAsteroids: 29,
  solarSystemLighting: 30,
  solarSystemMinorOrbits: 31,
  showEarthCloudLayer: 32,
  showElevationModel: 33,
  showAtmosphere: 34,
  multiResSolarSystemBodies: 35,
  auroraBorialis: 36,
  earthCutAway: 37,
  showSolarSystem: 38,
  clouds8k: 39,
  filedOfView: 40,
  showISSModel: 41,
  solarSystemCMB: 42,
  mpcZone1: 43,
  mpcZone2: 44,
  mpcZone3: 45,
  mpcZone4: 46,
  mpcZone5: 47,
  mpcZone6: 48,
  mpcZone7: 49,
  orbitFilters: 50
};
export const OverlayAnchor = {
  sky: 0,
  screen: 1
};
export const AudioType = {
  music: 0,
  voice: 1
};
export const ShapeType = {
  circle: 0,
  rectagle: 1,
  star: 2,
  donut: 3,
  arrow: 4,
  line: 5,
  openRectagle: 6
};
export const LoopTypes = {
  loop: 0,
  upDown: 1,
  down: 2,
  upDownOnce: 3,
  once: 4,
  begin: 5,
  end: 6
};
export const SelectionAnchor = {
  topLeft: 0,
  top: 1,
  topRight: 2,
  right: 3,
  bottomRight: 4,
  bottom: 5,
  bottomLeft: 6,
  left: 7,
  rotate: 8,
  move: 9,
  center: 10,
  none: 11
};
export const TextBorderStyle = {
  none: 0,
  tight: 1,
  small: 2,
  medium: 3,
  large: 4
};
export const UserLevel = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  educator: 3,
  professional: 4
};
export const TransitionType = {
  slew: 0,
  crossFade: 1,
  crossCut: 2,
  fadeOutIn: 3,
  fadeIn: 4,
  fadeOut: 5
};
export const Keys = {
  modifiers: -65536,
  none: 0,
  lButton: 1,
  rButton: 2,
  cancel: 3,
  mButton: 4,
  xButton1: 5,
  xButton2: 6,
  back: 8,
  tab: 9,
  lineFeed: 10,
  clearKey: 12,
  returnKey: 13,
  enter: 13,
  shiftKey: 16,
  controlKey: 17,
  menu: 18,
  pause: 19,
  capital: 20,
  capsLock: 20,
  kanaMode: 21,
  hanguelMode: 21,
  hangulMode: 21,
  junjaMode: 23,
  finalMode: 24,
  hanjaMode: 25,
  kanjiMode: 25,
  escape: 27,
  imeConvert: 28,
  imeNonconvert: 29,
  imeAccept: 30,
  imeAceept: 30,
  imeModeChange: 31,
  space: 32,
  prior: 33,
  pageUp: 33,
  next: 34,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  select: 41,
  print: 42,
  execute: 43,
  snapshot: 44,
  printScreen: 44,
  insertKey: 45,
  deleteKey: 46,
  help: 47,
  d0: 48,
  d1: 49,
  d2: 50,
  d3: 51,
  d4: 52,
  d5: 53,
  d6: 54,
  d7: 55,
  d8: 56,
  d9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  lWin: 91,
  rWin: 92,
  apps: 93,
  sleep: 95,
  numPad0: 96,
  numPad1: 97,
  numPad2: 98,
  numPad3: 99,
  numPad4: 100,
  numPad5: 101,
  numPad6: 102,
  numPad7: 103,
  numPad8: 104,
  numPad9: 105,
  multiply: 106,
  add: 107,
  separator: 108,
  subtract: 109,
  decimal: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  f13: 124,
  f14: 125,
  f15: 126,
  f16: 127,
  f17: 128,
  f18: 129,
  f19: 130,
  f20: 131,
  f21: 132,
  f22: 133,
  f23: 134,
  f24: 135,
  numLock: 144,
  scroll: 145,
  lShiftKey: 160,
  rShiftKey: 161,
  lControlKey: 162,
  rControlKey: 163,
  lMenu: 164,
  rMenu: 165,
  browserBack: 166,
  browserForward: 167,
  browserRefresh: 168,
  browserStop: 169,
  browserSearch: 170,
  browserFavorites: 171,
  browserHome: 172,
  volumeMute: 173,
  volumeDown: 174,
  volumeUp: 175,
  mediaNextTrack: 176,
  mediaPreviousTrack: 177,
  mediaStop: 178,
  mediaPlayPause: 179,
  launchMail: 180,
  selectMedia: 181,
  launchApplication1: 182,
  launchApplication2: 183,
  oemSemicolon: 186,
  oem1: 186,
  oemplus: 187,
  oemcomma: 188,
  oemMinus: 189,
  oemPeriod: 190,
  oemQuestion: 191,
  oem2: 191,
  oemtilde: 192,
  oem3: 192,
  oemOpenBrackets: 219,
  oem4: 219,
  oemPipe: 220,
  oem5: 220,
  oemCloseBrackets: 221,
  oem6: 221,
  oemQuotes: 222,
  oem7: 222,
  oem8: 223,
  oemBackslash: 226,
  oem102: 226,
  processKey: 229,
  packet: 231,
  attn: 246,
  crsel: 247,
  exsel: 248,
  eraseEof: 249,
  play: 250,
  zoom: 251,
  noName: 252,
  pa1: 253,
  oemClear: 254,
  keyCode: 65535,
  shift: 65536,
  control: 131072,
  alt: 262144
};
export const DialogResult = {
  OK: 1
};
export const Formatting = {
  indented: 1
};
export const StateType = {
  pending: 0,
  received: 1,
  error: 2
};
export const SolarSystemObjects = {
  sun: 0,
  mercury: 1,
  venus: 2,
  mars: 3,
  jupiter: 4,
  saturn: 5,
  uranus: 6,
  neptune: 7,
  pluto: 8,
  moon: 9,
  io: 10,
  europa: 11,
  ganymede: 12,
  callisto: 13,
  ioShadow: 14,
  europaShadow: 15,
  ganymedeShadow: 16,
  callistoShadow: 17,
  sunEclipsed: 18,
  earth: 19,
  custom: 20,
  undefined: 65536
};
export const InterpolationType = {
  linear: 0,
  easeIn: 1,
  easeOut: 2,
  easeInOut: 3,
  exponential: 4,
  defaultV: 5
};
export const PointType = {
  move: 0,
  line: 1,
  dash: 2,
  start: 3
};
export const LocationHint = {
  slash: 0,
  backslash: 1,
  top: 2
};
export const FolderGroup = {
  explorer: 0,
  tour: 1,
  search: 2,
  constellation: 3,
  view: 4,
  goTo: 5,
  community: 6,
  context: 7,
  voTable: 8,
  imageStack: 9
};
export const FolderRefreshType = {
  interval: 0,
  conditionalGet: 1,
  viewChange: 2
};
export const FolderType = {
  earth: 0,
  planet: 1,
  sky: 2,
  panorama: 3
};
export const ThumbnailSize = {
  small: 0,
  big: 1
};
export const ProjectionType = {
  mercator: 0,
  equirectangular: 1,
  tangent: 2,
  tan: 2,
  toast: 3,
  spherical: 4,
  skyImage: 5,
  plotted: 6
};
export const ImageSetType = {
  earth: 0,
  planet: 1,
  sky: 2,
  panorama: 3,
  solarSystem: 4,
  sandbox: 5
};
export const BandPass = {
  gamma: 0,
  xRay: 1,
  ultraviolet: 2,
  visible: 3,
  hydrogenAlpha: 4,
  IR: 4,
  microwave: 5,
  radio: 6,
  visibleNight: 6
};
export const Classification = {
  star: 1,
  supernova: 2,
  blackHole: 4,
  neutronStar: 8,
  doubleStar: 16,
  multipleStars: 32,
  asterism: 64,
  constellation: 128,
  openCluster: 256,
  globularCluster: 512,
  nebulousCluster: 1024,
  nebula: 2048,
  emissionNebula: 4096,
  planetaryNebula: 8192,
  reflectionNebula: 16384,
  darkNebula: 32768,
  giantMolecularCloud: 65536,
  supernovaRemnant: 131072,
  interstellarDust: 262144,
  quasar: 524288,
  galaxy: 1048576,
  spiralGalaxy: 2097152,
  irregularGalaxy: 4194304,
  ellipticalGalaxy: 8388608,
  knot: 16777216,
  plateDefect: 33554432,
  clusterOfGalaxies: 67108864,
  otherNGC: 134217728,
  unidentified: 268435456,
  solarSystem: 536870912,
  unfiltered: 1073741823,
  stellar: 63,
  stellarGroupings: 2032,
  nebulae: 523264,
  galactic: 133693440,
  other: 436207616
};