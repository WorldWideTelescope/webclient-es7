import {CT} from './AACoordinateTransformation';

export const EPO = {

  mercuryMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(252.250906 + 149474.0722491 * T + 0.0003035 * Tsquared + 1.8E-08 * Tcubed);
  },
  mercurySemimajorAxis: UnnamedParameter1 => 0.38709831,
  mercuryEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.20563175 + 2.0407E-05 * T - 2.83E-08 * Tsquared - 1.8E-10 * Tcubed;
  },
  mercuryInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(7.004986 + 0.0018215 * T - 1.81E-05 * Tsquared + 5.6E-08 * Tcubed);
  },
  mercuryLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(48.330893 + 1.1861883 * T + 0.00017542 * Tsquared + 2.15E-07 * Tcubed);
  },
  mercuryLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(77.456119 + 1.5564776 * T + 0.00029544 * Tsquared + 9E-09 * Tcubed);
  },
  venusMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(181.979801 + 58519.2130302 * T + 0.00031014 * Tsquared + 1.5E-08 * Tcubed);
  },
  venusSemimajorAxis: UnnamedParameter1 => 0.72332982,
  venusEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.00677192 - 4.7765E-05 * T + 9.81E-08 * Tsquared + 4.6E-10 * Tcubed;
  },
  venusInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(3.394662 + 0.0010037 * T - 8.8E-07 * Tsquared - 7E-09 * Tcubed);
  },
  venusLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(76.67992 + 0.9011206 * T + 0.00040618 * Tsquared - 9.3E-08 * Tcubed);
  },
  venusLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(131.563703 + 1.4022288 * T - 0.00107618 * Tsquared - 5.678E-06 * Tcubed);
  },
  earthMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(100.466457 + 36000.7698278 * T + 0.00030322 * Tsquared + 2E-08 * Tcubed);
  },
  earthSemimajorAxis: UnnamedParameter1 => 1.000001018,
  earthEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.01670863 - 4.2037E-05 * T - 1.267E-07 * Tsquared + 1.4E-10 * Tcubed;
  },
  earthInclination: UnnamedParameter1 => 0,
  earthLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(102.937348 + 1.17195366 * T + 0.00045688 * Tsquared - 1.8E-08 * Tcubed);
  },
  marsMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(355.433 + 19141.6964471 * T + 0.00031052 * Tsquared + 1.6E-08 * Tcubed);
  },
  marsSemimajorAxis: UnnamedParameter1 => 1.523679342,
  marsEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.09340065 + 9.0484E-05 * T - 8.06E-08 * Tsquared - 2.5E-10 * Tcubed;
  },
  marsInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(1.849726 - 0.0006011 * T + 1.276E-05 * Tsquared - 7E-09 * Tcubed);
  },
  marsLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(49.588093 + 0.7720959 * T + 1.557E-05 * Tsquared + 2.267E-06 * Tcubed);
  },
  marsLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(336.060234 + 1.8410449 * T + 0.00013477 * Tsquared + 5.36E-07 * Tcubed);
  },
  jupiterMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(34.351519 + 3036.3027748 * T + 0.0002233 * Tsquared + 3.7E-08 * Tcubed);
  },
  jupiterSemimajorAxis: JD => {
    const T = (JD - 2451545) / 36525;
    return 5.202603209 + 1.913E-07 * T;
  },
  jupiterEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.04849793 + 0.000163225 * T - 4.714E-07 * Tsquared - 2.01E-09 * Tcubed;
  },
  jupiterInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(1.303267 - 0.0054965 * T + 4.66E-06 * Tsquared - 2E-09 * Tcubed);
  },
  jupiterLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(100.464407 + 1.0209774 * T + 0.00040315 * Tsquared + 4.04E-07 * Tcubed);
  },
  jupiterLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(14.331207 + 1.6126352 * T + 0.00103042 * Tsquared - 4.464E-06 * Tcubed);
  },
  saturnMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(50.077444 + 1223.5110686 * T + 0.00051908 * Tsquared - 3E-08 * Tcubed);
  },
  saturnSemimajorAxis: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    return 9.554909192 - 2.139E-06 * T + 4E-09 * Tsquared;
  },
  saturnEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.05554814 - 0.0003446641 * T - 6.436E-07 * Tsquared + 3.4E-09 * Tcubed;
  },
  saturnInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(2.488879 - 0.0037362 * T - 1.519E-05 * Tsquared + 8.7E-08 * Tcubed);
  },
  saturnLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(113.665503 + 0.877088 * T - 0.00012176 * Tsquared - 2.249E-06 * Tcubed);
  },
  saturnLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(93.057237 + 1.19637613 * T + 0.00083753 * Tsquared + 4.928E-06 * Tcubed);
  },
  uranusMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(314.055005 + 429.8640561 * T + 0.0003039 * Tsquared + 2.6E-08 * Tcubed);
  },
  uranusSemimajorAxis: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    return 19.218446062 - 3.72E-08 * T + 9.8E-10 * Tsquared;
  },
  uranusEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.04638122 - 2.7293E-05 * T + 7.89E-08 * Tsquared + 2.4E-10 * Tcubed;
  },
  uranusInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(0.773197 + 0.0007744 * T + 3.749E-05 * Tsquared - 9.2E-08 * Tcubed);
  },
  uranusLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(74.005957 + 0.5211278 * T + 0.00133947 * Tsquared + 1.8484E-05 * Tcubed);
  },
  uranusLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(173.005291 + 1.486379 * T + 0.00021406 * Tsquared + 4.34E-07 * Tcubed);
  },
  neptuneMeanLongitude: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(304.348665 + 219.8833092 * T + 0.00030882 * Tsquared + 1.8E-08 * Tcubed);
  },
  neptuneSemimajorAxis: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    return 30.110386869 - 1.663E-07 * T + 6.9E-10 * Tsquared;
  },
  neptuneEccentricity: JD => {
    const T = (JD - 2451545) / 36525;
    const Tcubed = T * T * T;
    return 0.00945575 + 6.033E-06 * T - 5E-11 * Tcubed;
  },
  neptuneInclination: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(1.769953 - 0.0093082 * T - 7.08E-06 * Tsquared + 2.7E-08 * Tcubed);
  },
  neptuneLongitudeAscendingNode: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(131.784057 + 1.1022039 * T + 0.00025952 * Tsquared - 6.37E-07 * Tcubed);
  },
  neptuneLongitudePerihelion: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(48.120276 + 1.4262957 * T + 0.00038434 * Tsquared + 2E-08 * Tcubed);
  },
  mercuryMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(252.250906 + 149472.6746358 * T - 5.36E-06 * Tsquared + 2E-09 * Tcubed);
  },
  mercuryInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(7.004986 - 0.0059516 * T + 8E-07 * Tsquared + 4.3E-08 * Tcubed);
  },
  mercuryLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(48.330893 - 0.1254227 * T - 8.833E-05 * Tsquared - 2E-07 * Tcubed);
  },
  mercuryLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(77.456119 + 0.1588643 * T - 1.342E-05 * Tsquared - 7E-09 * Tcubed);
  },
  venusMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(181.979801 + 58517.815676 * T + 1.65E-06 * Tsquared - 2E-09 * Tcubed);
  },
  venusInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(3.394662 - 0.0008568 * T - 3.244E-05 * Tsquared + 9E-09 * Tcubed);
  },
  venusLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(76.67992 - 0.2780134 * T - 0.00014257 * Tsquared - 1.64E-07 * Tcubed);
  },
  venusLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(131.563703 + 0.0048746 * T - 0.00138467 * Tsquared - 5.695E-06 * Tcubed);
  },
  earthMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(100.466457 + 35999.3728565 * T - 5.68E-06 * Tsquared - 1E-09 * Tcubed);
  },
  earthInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return 0.0130548 * T - 9.31E-06 * Tsquared - 3.4E-08 * Tcubed;
  },
  earthLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(174.873176 - 0.241098 * T + 4.262E-05 * Tsquared + 1E-09 * Tcubed);
  },
  earthLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(102.937348 + 0.3225654 * T + 0.00014799 * Tsquared - 3.9E-08 * Tcubed);
  },
  marsMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(355.433 + 19140.2993039 * T + 2.62E-06 * Tsquared - 3E-09 * Tcubed);
  },
  marsInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(1.849726 - 0.0081477 * T - 2.255E-05 * Tsquared - 2.9E-08 * Tcubed);
  },
  marsLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(49.588093 - 0.295025 * T - 0.00064048 * Tsquared - 1.964E-06 * Tcubed);
  },
  marsLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(336.060234 + 0.4439016 * T - 0.00017313 * Tsquared + 5.18E-07 * Tcubed);
  },
  jupiterMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(34.351519 + 3034.9056606 * T - 8.501E-05 * Tsquared + 1.6E-08 * Tcubed);
  },
  jupiterInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(1.303267 - 0.0019877 * T + 3.32E-05 * Tsquared + 9.7E-08 * Tcubed);
  },
  jupiterLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(100.464407 + 0.1767232 * T + 0.000907 * Tsquared - 7.272E-06 * Tcubed);
  },
  jupiterLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(14.331207 + 0.2155209 * T + 0.00072211 * Tsquared - 4.485E-06 * Tcubed);
  },
  saturnMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(50.077444 + 1222.1138488 * T + 0.00021004 * Tsquared - 4.6E-08 * Tcubed);
  },
  saturnInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(2.488879 + 0.0025514 * T - 4.906E-05 * Tsquared + 1.7E-08 * Tcubed);
  },
  saturnLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(113.665503 - 0.2566722 * T - 0.00018399 * Tsquared + 4.8E-07 * Tcubed);
  },
  saturnLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(93.057237 + 0.5665415 * T + 0.0005285 * Tsquared + 4.912E-06 * Tcubed);
  },
  uranusMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(314.055005 + 428.4669983 * T - 4.86E-06 * Tsquared + 6E-09 * Tcubed);
  },
  uranusInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(0.773197 - 0.0016869 * T + 3.49E-06 * Tsquared + 1.6E-08 * Tcubed);
  },
  uranusLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(74.005957 + 0.0741431 * T + 0.00040539 * Tsquared + 1.19E-07 * Tcubed);
  },
  uranusLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(173.005291 + 0.0893212 * T - 9.47E-05 * Tsquared + 4.14E-07 * Tcubed);
  },
  neptuneMeanLongitudeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(304.348665 + 218.4862002 * T + 5.9E-07 * Tsquared - 2E-09 * Tcubed);
  },
  neptuneInclinationJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    return CT.m360(1.769953 + 0.0002256 * T + 2.3E-07 * Tsquared);
  },
  neptuneLongitudeAscendingNodeJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    const Tcubed = Tsquared * T;
    return CT.m360(131.784057 - 0.0061651 * T - 2.19E-06 * Tsquared - 7.8E-08 * Tcubed);
  },
  neptuneLongitudePerihelionJ2000: JD => {
    const T = (JD - 2451545) / 36525;
    const Tsquared = T * T;
    return CT.m360(48.120276 + 0.0291866 * T + 7.61E-05 * Tsquared);
  }
};
