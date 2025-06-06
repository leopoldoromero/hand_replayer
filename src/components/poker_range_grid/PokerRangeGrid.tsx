'use client';
import React, { useEffect, useState } from 'react';
import { Cell, Container, Grid } from './PokerRangeGrid.styles';
import Block from '../block/Block';
import Text from '../text/Text';
import { POKER_HANDS, SORTED_HANDS_BY_STRENGTH } from '@/helpers/get_range_string';
import { rangeUiFormated } from '@/helpers/ui.helpers';


const calculateCombos = () => {
  const totalHands = POKER_HANDS.length;
  const upperSquares = (totalHands * (totalHands - 1)) / 2;
  const lowerSquares = upperSquares;
  const suited = upperSquares * 4;
  const offsuit = lowerSquares * 12;
  const pocketPairs = totalHands * 6;
  return suited + offsuit + pocketPairs;
};

interface Props {
  selectedHands: string[];
  onSelectedHandsChange: (hands: string[]) => void;
}

const PokerRangeGrid: React.FC<Props> = ({selectedHands, onSelectedHandsChange}) => {
  const [percentage, setPercentage] = useState<number>(0);

  const combosCalculator = (hand: string) => {
    const OFFSUIT_HAND_COMBOS = 12;
    const POCKET_PAIR_COMBOS = 6;
    const SUITED_COMBOS = 4;
    const POCKET_PAIRS_LEN = 2;
    const OFFSUIT_IDENTIFIER = 'o';
    const POCKET_PAIRS_ABREVIATE_SIMBOL = '+';
    const TOTAL_POCKETS = 12;

    if (hand?.includes(POCKET_PAIRS_ABREVIATE_SIMBOL)) {
      const allPocketPairs = POKER_HANDS
        .map((_, i) => POKER_HANDS[i][i])
        .reverse();
      return (
        TOTAL_POCKETS -
        allPocketPairs.indexOf(hand.slice(0, 2)) * POCKET_PAIR_COMBOS
      );
    }

    if (hand?.length === POCKET_PAIRS_LEN) {
      return POCKET_PAIR_COMBOS;
    }
    if (hand?.includes(OFFSUIT_IDENTIFIER)) {
      return OFFSUIT_HAND_COMBOS;
    }
    return SUITED_COMBOS;
  };

  const toggleHand = (hand: string) => {
   const isSelected = selectedHands.includes(hand);
   const newSelectedHands = isSelected
     ? selectedHands.filter((h) => h !== hand)
     : [...selectedHands, hand];
    onSelectedHandsChange(newSelectedHands);
  };

  useEffect(() => {
    const handsRangeCombos = selectedHands.reduce(
      (acc, val) => acc + combosCalculator(val),
      0
    );
    const newPercentage = (handsRangeCombos * 100) / calculateCombos();
    setPercentage(Number(newPercentage.toFixed(2))); 
  }, [selectedHands]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = Number(event.target.value);
    //setPercentage(newPercentage);
    let calculatedPercentage = 0;
    let i = 0;
    const handsToSelect = [];
    while (
      calculatedPercentage < newPercentage &&
      i < SORTED_HANDS_BY_STRENGTH.length
    ) {
      handsToSelect.push(SORTED_HANDS_BY_STRENGTH[i]);
      calculatedPercentage +=
        (combosCalculator(SORTED_HANDS_BY_STRENGTH[i]) * 100) /
        calculateCombos();
      i++;
    }
    onSelectedHandsChange(handsToSelect);
  };

  return (
    <Container>
      <Block display='flex' align='center'>
        <input
          type='range'
          min='0'
          max='100'
          value={percentage}
          onChange={handleSliderChange}
        />
        <span>{percentage}%</span>
      </Block>
      <Grid>
        {POKER_HANDS.map((row, rowIndex) =>
          row.map((hand, colIndex) => (
            <Cell
              key={`${rowIndex}_${colIndex}`}
              $selected={selectedHands.includes(hand)}
              onClick={() => toggleHand(hand)}
            >
              {hand}
            </Cell>
          ))
        )}
      </Grid>
      <Block display='flex' align='center' mt='s'>
        <Text as='strong' fontSize='base' weight='semiBold' mr='xs'>
          Selected Range:
        </Text>
        <Text
          whiteSpace='nowrap'
          overFlow='hidden'
          textOverFlow='ellipsis'
          fontSize='medium'
          customStyles={{ maxWidth: '250px' }}
        >
          {rangeUiFormated(selectedHands, 10)}
        </Text>
      </Block>
    </Container>
  );
};

export default PokerRangeGrid;
