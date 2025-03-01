import { PreflopStats } from '@/modules/hand/domain/player';
import Block from '../block/Block';
import Modal from '../modal/Modal';
import Text from '../text/Text';
import CircularProgress from '../circular_progress/CircularProgress';
import Backdrop from '../backdrop/Backdrop';
import Button from '../button/Button';

interface Props {
  isOpen: boolean;
  stats?: PreflopStats;
  onClose: () => void;
  name: string;
  onSelectRange: () => void;
}

const StatsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stats,
  name,
  onSelectRange,
}) => (
  <>
    <Backdrop isVisible={isOpen} hasButton onClose={onClose} />
    <Modal isOpen={isOpen} onClose={onClose}>
      <Block
        display='flex'
        direction='column'
        customStyles={{ minWidth: '140px', padding: '0.5rem' }}
      >
        <Block display='flex' justify='space-between' mb='s'>
          <Block display='flex' align='center' mr='xs'>
            <Text>{name}</Text>
          </Block>
          <Block display='flex' align='center'>
            <Text fontSize='small' mr='xs'>
              Hands
            </Text>
            <Text>{stats?.hands}</Text>
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
              percentage={Math.round(stats?.pfr ?? 0)}
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
              percentage={Math.round(stats?.vpip ?? 0)}
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
              percentage={Math.round(stats?.threeBetPercent ?? 0)}
              size={40}
            />
          </Block>
        </Block>
        <Block display='flex' justify='center'>
          <Button
            type='submit'
            // disabled={loading}
            variant='default'
            size='m'
            text='Select Range'
            color='green'
            onClick={() => onSelectRange()}
          />
        </Block>
      </Block>
    </Modal>
  </>
);

export default StatsModal;
