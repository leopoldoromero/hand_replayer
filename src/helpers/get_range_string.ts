export const POKER_HANDS = [
  [
    'AA',
    'AKs',
    'AQs',
    'AJs',
    'ATs',
    'A9s',
    'A8s',
    'A7s',
    'A6s',
    'A5s',
    'A4s',
    'A3s',
    'A2s',
  ],
  [
    'AKo',
    'KK',
    'KQs',
    'KJs',
    'KTs',
    'K9s',
    'K8s',
    'K7s',
    'K6s',
    'K5s',
    'K4s',
    'K3s',
    'K2s',
  ],
  [
    'AQo',
    'KQo',
    'QQ',
    'QJs',
    'QTs',
    'Q9s',
    'Q8s',
    'Q7s',
    'Q6s',
    'Q5s',
    'Q4s',
    'Q3s',
    'Q2s',
  ],
  [
    'AJo',
    'KJo',
    'QJo',
    'JJ',
    'JTs',
    'J9s',
    'J8s',
    'J7s',
    'J6s',
    'J5s',
    'J4s',
    'J3s',
    'J2s',
  ],
  [
    'ATo',
    'KTo',
    'QTo',
    'JTo',
    'TT',
    'T9s',
    'T8s',
    'T7s',
    'T6s',
    'T5s',
    'T4s',
    'T3s',
    'T2s',
  ],
  [
    'A9o',
    'K9o',
    'Q9o',
    'J9o',
    'T9o',
    '99',
    '98s',
    '97s',
    '96s',
    '95s',
    '94s',
    '93s',
    '92s',
  ],
  [
    'A8o',
    'K8o',
    'Q8o',
    'J8o',
    'T8o',
    '98o',
    '88',
    '87s',
    '86s',
    '85s',
    '84s',
    '83s',
    '82s',
  ],
  [
    'A7o',
    'K7o',
    'Q7o',
    'J7o',
    'T7o',
    '97o',
    '87o',
    '77',
    '76s',
    '75s',
    '74s',
    '73s',
    '72s',
  ],
  [
    'A6o',
    'K6o',
    'Q6o',
    'J6o',
    'T6o',
    '96o',
    '86o',
    '76o',
    '66',
    '65s',
    '64s',
    '63s',
    '62s',
  ],
  [
    'A5o',
    'K5o',
    'Q5o',
    'J5o',
    'T5o',
    '95o',
    '85o',
    '75o',
    '65o',
    '55',
    '54s',
    '53s',
    '52s',
  ],
  [
    'A4o',
    'K4o',
    'Q4o',
    'J4o',
    'T4o',
    '94o',
    '84o',
    '74o',
    '64o',
    '54o',
    '44',
    '43s',
    '42s',
  ],
  [
    'A3o',
    'K3o',
    'Q3o',
    'J3o',
    'T3o',
    '93o',
    '83o',
    '73o',
    '63o',
    '53o',
    '43o',
    '33',
    '32s',
  ],
  [
    'A2o',
    'K2o',
    'Q2o',
    'J2o',
    'T2o',
    '92o',
    '82o',
    '72o',
    '62o',
    '52o',
    '42o',
    '32o',
    '22',
  ],
];

export const shortedRange = (selected: Array<string>): Array<string> => {
    const pocketPairs = selected
      .filter((h) => h.length === 2 && h[0] === h[1])
      .sort()
      .reverse();
    const allPocketPairs = POKER_HANDS.map((_, i) => POKER_HANDS[i][i]).reverse();
    const sortedPocketPairs = pocketPairs
      .map((el) => allPocketPairs.indexOf(el))
      .sort((a, b) => a - b)
      .map((index) => allPocketPairs[index]);
    const lowestPP = sortedPocketPairs?.length ? sortedPocketPairs[0] : '';
    const allHighestPp = lowestPP
      ? allPocketPairs.slice(allPocketPairs.indexOf(lowestPP))
      : [];
    const pocketPairsRange =
      pocketPairs?.length && allHighestPp?.length === pocketPairs?.length
        ? `${lowestPP}+`
        : pocketPairs;
    const nonPocketHands = selected.filter(
      (h) => !(h.length === 2 && h[0] === h[1])
    );
    const hands = pocketPairsRange
      ? [...[pocketPairsRange], ...nonPocketHands]
      : nonPocketHands;
      return hands.flat()
  };

export const SORTED_HANDS_BY_STRENGTH = [
  'AA',
  'KK',
  'QQ',
  'JJ',
  'TT',
  '99',
  'AKs',
  'AKo',
  'AQs',
  '88',
  'AJs',
  'KQs',
  'ATs',
  'AQo',
  '77',
  'KJs',
  'KTs',
  'A9s',
  'AJo',
  'KQo',
  'QJs',
  'QTs',
  '66',
  'JTs',
  'A8s',
  '55',
  'ATo',
  'KJo',
  'KTo',
  'A5s',
  'A4s',
  'QJo',
  'QTo',
  'JTo',
  'A7s',
  'A6s',
  'A3s',
  'A2s',
  'K9s',
  'Q9s',
  'A9o',
  'K8s',
  'K7s',
  'J9s',
  'A8o',
  'K9o',
  '44',
  'K6s',
  'A7o',
  '33',
  'Q8s',
  'Q7s',
  'K5s',
  'A5o',
  'Q9o',
  'T9s',
  'K4s',
  'T8s',
  '98s',
  'A6o',
  'K3s',
  'K8o',
  'J8s',
  'J7s',
  '22',
  'A4o',
  'K2s',
  'Q6s',
  'Q5s',
  'K7o',
  'A3o',
  'J9o',
  'T7s',
  'Q8o',
  'T9o',
  'J6s',
  'A2o',
  'Q4s',
  'Q3s',
  'J5s',
  '87s',
  'K6o',
  'K5o',
  'J8o',
  'T6s',
  'Q2s',
  'Q7o',
  'J4s',
  '97s',
  '96s',
  'K4o',
  '76s',
  'T8o',
  'J3s',
  '98o',
  'Q6o',
  'J7o',
  'K3o',
  'K2o',
  'T5s',
  'T4s',
  'J2s',
  '95s',
  'Q5o',
  '65s',
  'T3s',
  'T7o',
  '86s',
  '85s',
  '75s',
  'Q4o',
  'J6o',
  '97o',
  '54s',
  '87o',
  'T2s',
  '94s',
  'Q3o',
  '84s',
  '93s',
  'J5o',
  '64s',
  '74s',
  'Q2o',
  '92s',
  'J4o',
  '53s',
  '43s',
  '32s',
  '96o',
  '86o',
  '76o',
  '73s',
  '83s',
  '63s',
  'T6o',
  'J3o',
  'T5o',
  '82s',
  'J2o',
  'T4o',
  '95o',
  '52s',
  '62s',
  '72s',
  '42s',
  '85o',
  '65o',
  '75o',
  'T3o',
  'T2o',
  '94o',
  '54o',
  '84o',
  '64o',
  '93o',
  '74o',
  '92o',
  '53o',
  '83o',
  '63o',
  '73o',
  '43o',
  '82o',
  '52o',
  '62o',
  '42o',
  '32o',
  '72o',
];
