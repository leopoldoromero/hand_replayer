'use client';
import Block from '../block/Block';
import Text from '../text/Text';
import CircularProgress from '../circular_progress/CircularProgress';
import { PreflopStats } from '@/modules/hand/domain/player';

interface Props {
  statsModalData: {playerName: string; isOpen: boolean; stats?: PreflopStats};
}

const StatsSection: React.FC<Props> = ({statsModalData}) => {  
  return (
    <Block
        display='flex'
        direction='column'
        width='100%'
        customStyles={{ maxWidth: '200px', padding: '0.5rem' }}
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
    </Block>
);
}

export default StatsSection;