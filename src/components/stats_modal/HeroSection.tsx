'use client';
import Block from '../block/Block';
import Text from '../text/Text';
import Button from '../button/Button';
import { cardsToUiMapper, rangeUiFormated } from '@/helpers/ui.helpers';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { ReplayerState } from '@/lib/redux/replayer/replayer.slice';
import { selectReplayerState } from '@/lib/redux/replayer/replayer.selector';
import Dropdown from '../dropdown/DropDown';
import { calculateEquity } from '@/lib/redux/replayer/replayer.thunk';
import { Equity } from '@/modules/equity/domain/equity';
import { ColorKeys } from '@/theme/colors';

interface Props {
  toggleRangeSelectorModal(playerName?: string): void;
  selectedVillian: string;
  setSelectedVillain: (name: string) => void
}
function toCamelCase(str: string) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
}
const showEquityResultsAsPercents = (value: number) => `${(value * 100).toFixed(2)}%`

const colorsByEquityKey: {[key in keyof Equity]: ColorKeys} = {
  win: 'green',
  loose: 'red',
  tie: 'blue'
}

const HeroSection: React.FC<Props> = ({toggleRangeSelectorModal, selectedVillian, setSelectedVillain}) => {
    const { 
    gameState, 
    playersRanges,
    equityCalculation
   } = useSelector<
    DefaultState,
    ReplayerState
  >(selectReplayerState);
  const dispatch = useDispatch<DispatchAction>();
  if (!gameState?.heroName) return 
  const heroSelectedRange: Array<string> = playersRanges[gameState?.heroName] ?? []
  const selectedVillianRange: Array<string> = playersRanges[selectedVillian] ?? []
  const formatVillianRangeSelectBtnText = () => {
    const selectedVillainNameLength = selectedVillian.length;
    const maxLength = 10;
    return selectedVillainNameLength > maxLength
      ? `${selectedVillian.slice(0, maxLength)}...`
      : selectedVillian;
  }

    return (
        <Block customStyles={{ minWidth: '250px', padding: '0.5rem' }}>
            <Block display='flex' justify='center' mb='m'>
                <Button
                type='submit'
                disabled={equityCalculation?.loading}
                variant='default'
                size='m'
                text='Select Range'
                color='green'
                onClick={() => toggleRangeSelectorModal(gameState?.heroName)}
                />
            </Block>
            <Block mb='m'>
                <Text 
                fontSize='small'
                overFlow='hidden'
                whiteSpace='nowrap' 
                textOverFlow='ellipsis' 
                customStyles={{ maxWidth: '200px' }}
                mb='m' weight='medium' textAlign='center'
                >
                    {heroSelectedRange.length ? `Selected range: ${rangeUiFormated(heroSelectedRange)}` : `No range selected, (${cardsToUiMapper(gameState?.heroCards ?? [])?.join('')}) will be used`}
                </Text>
            </Block>
            <Block display='flex' justify='flex-end' width='100%'>
              <Block 
              display='flex' 
              justify='center' 
              mb='m'
              customStyles={{ minWidth: '150px' }}
              >
                  <Dropdown
                      label='Equity Vs Villian'
                      options={gameState?.playersInHand ?? []}
                      value={selectedVillian}
                      onChange={(value) => setSelectedVillain(value)}
                  />
              </Block>
            </Block>
            {
              selectedVillian ? (
                  <Block display='flex' justify='center' mb='m'>
                  <Button
                      type='submit'
                      disabled={equityCalculation?.loading}
                      variant='default'
                      size='m'
                      text={`${selectedVillianRange?.length ? 'Update' : 'Select'} Range for: ${formatVillianRangeSelectBtnText()}`}
                      color='green'
                      onClick={() => toggleRangeSelectorModal(selectedVillian)}
                  />
                  </Block>
              ) : null
            }
            {
          selectedVillianRange ? (
            <Block display='flex' direction='column' justify='center' align='center' mb='m'>
              <Button
                type='submit'
                disabled={equityCalculation?.loading}
                variant='default'
                size='m'
                text={`${equityCalculation?.result ? 'Recalculate' : 'Calculate'}`}
                color='green'
                onClick={() => dispatch(calculateEquity(selectedVillian))}
              />
            </Block>
          ) : null
        }
        {
          equityCalculation?.loading ? (
            <span>Loading....</span>
          ) :  equityCalculation?.result ? (
                  <Block display='flex' justify='space-evenly' align='center'>
                    {
                      (Object.keys(equityCalculation?.result) as Array<keyof Equity>).map((key) => (
                        <Block key={key} mr='xs'>
                          <Text mr='xs'>{toCamelCase(key)}:</Text>
                          <Text color={colorsByEquityKey[key]}>{showEquityResultsAsPercents(equityCalculation.result![key])}</Text>
                        </Block>
                      ))
                    }
                  </Block>
                ) : null
        }
        </Block>
    );
}

export default HeroSection;
