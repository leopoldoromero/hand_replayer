'use client';
import Block from '../block/Block';
import Modal from '../modal/Modal';
import Text from '../text/Text';
import CircularProgress from '../circular_progress/CircularProgress';
import Backdrop from '../backdrop/Backdrop';
import Button from '../button/Button';
import Dropdown from '../dropdown/DropDown';
import { selectReplayerState } from '@/lib/redux/replayer/replayer.selector';
import { ReplayerState, setSelectedVillainName, toggleRangeSelectorModal, toggleStatsModal } from '@/lib/redux/replayer/replayer.slice';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';


const StatsModal = () => {
  const { statsModalData, gameState, selectedVillainData } = useSelector<
    DefaultState,
    ReplayerState
  >(selectReplayerState);
    const dispatch = useDispatch<DispatchAction>();

  const cardsToUiMapper = (cards: Array<string>) => {
    const suitMap: {[key in string]: string} = {'s': '♠', 'h': '♥', 'd': '♦', 'c': '♣'}
    return cards.map(((card) => `${card[0]}${suitMap[card[1]]}`))
  }

  const formatVillianRangeSelectBtnText = () => {
    const selectedVillainNameLength = selectedVillainData?.name.length;
    const maxLength = 10;
    return selectedVillainNameLength > maxLength
      ? `${selectedVillainData?.name.slice(0, maxLength)}...`
      : selectedVillainData?.name;
  }

  return (
  <>
    <Backdrop isVisible={statsModalData?.isOpen} hasButton onClose={() => dispatch(toggleStatsModal())} />
    <Modal isOpen={statsModalData?.isOpen} onClose={() => dispatch(toggleStatsModal())}>
      <Block
        display='flex'
        direction='column'
        customStyles={{ minWidth: '140px', padding: '0.5rem' }}
      >
        <Block display='flex' justify='space-between' mb='m'>
          <Block display='flex' align='center' mr='xs'>
            <Text>{statsModalData?.playerName}</Text>
          </Block>
          <Block display='flex' align='center'>
            <Text fontSize='small' mr='xs'>
              Hands
            </Text>
            <Text>{statsModalData?.stats?.hands}</Text>
          </Block>
        </Block>
        <Block display='flex' justify='space-between' mb='m'>
          <Block
            display='flex'
            direction='column'
            align='center'
            justify='space-between'
          >
            <Text fontSize='small'>PFR</Text>
            <CircularProgress
              percentage={Math.round(statsModalData?.stats?.pfr ?? 0)}
              size={40}
            />
          </Block>
          <Block
            display='flex'
            direction='column'
            align='center'
            justify='space-between'
          >
            <Text fontSize='small'>VPIP</Text>
            <CircularProgress
              percentage={Math.round(statsModalData?.stats?.vpip ?? 0)}
              size={40}
            />
          </Block>
          <Block
            display='flex'
            direction='column'
            align='center'
            justify='space-between'
          >
            <Text fontSize='small'>3BET</Text>
            <CircularProgress
              percentage={Math.round(statsModalData?.stats?.threeBetPercent ?? 0)}
              size={40}
            />
          </Block>
        </Block>
        <Block display='flex' justify='center' mb='m'>
          <Button
            type='submit'
            // disabled={loading}
            variant='default'
            size='m'
            text='Select Range'
            color='green'
            onClick={() => dispatch(toggleRangeSelectorModal())}
          />
        </Block>
        <Text fontSize='tiny' mb='m' weight='medium' textAlign='center'>{`No range selected? Your hand (${cardsToUiMapper(gameState?.heroCards ?? [])?.join('')}) will be used`}</Text>
        <Block display='flex' justify='center' mb='m'>
          <Dropdown
            label='Equity Vs Villian'
            options={gameState?.playersInHand ?? []}
            value={selectedVillainData?.name}
            onChange={(value) => dispatch(setSelectedVillainName(value))}
          />
        </Block>
        {
          selectedVillainData?.name ? (
            <Block display='flex' justify='center' mb='m'>
              <Button
                type='submit'
                // disabled={loading}
                variant='default'
                size='m'
                text={`Select Range for: ${formatVillianRangeSelectBtnText()}`}
                color='green'
                onClick={() => console.log('Select Range for villain')}
              />
            </Block>
          ) : null
        }
        {
          selectedVillainData?.range ? (
            <Block display='flex' justify='center' mb='m'>
              <Button
                type='submit'
                // disabled={loading}
                variant='default'
                size='m'
                text='Calculate'
                color='green'
                onClick={() => console.log('Select Range for villain')}
              />
            </Block>
          ) : null
        }
      </Block>
    </Modal>
  </>
);
}

export default StatsModal;
