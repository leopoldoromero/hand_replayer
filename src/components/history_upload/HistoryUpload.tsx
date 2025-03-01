'use client';
import { useEffect, useState } from 'react';
import Block from '../block/Block';
import Text from '../text/Text';
import Textarea from '../textarea/Textarea';
import { StyledForm } from './HistoryUpload.styles';
import UploadedHandsList from '../uploaded_hands_list/UploadedHandsList';
import Button from '../button/Button';
import { uploadHandsAction } from '@/actions/upload_hands.action';
import { getHandsAction } from '@/actions/get_hands.action';
import { Hand, positionNumberToName } from '@/modules/hand/domain/hand';
import { Criteria } from '@/modules/shared/domain/criteria';
import HandListFilters from '../uploaded_hands_list/HandListFilters';

const HistoryUploadComponent = () => {
  const [hands, setHands] = useState<Array<Hand>>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const filterHandsByCriteria = (criteria: Criteria) => {
    const filterHands: Array<Hand> = [];
    criteria.filters?.forEach((filter) => {
      switch (filter.field) {
        case 'potType':
          filterHands.push(
            ...hands.filter((hand) => hand.potType === filter.value)
          );
        case 'position':
          filterHands.push(
            ...hands.filter((hand) => {
              const position = positionNumberToName(
                hand.hero?.seat,
                hand.tableType === '6-max'
              );
              return position === filter.value;
            })
          );
        case 'minPotSize':
          filterHands.push(
            ...hands.filter(
              (hand) => hand.potAmount / hand.bb >= (filter.value as number)
            )
          );
        case 'loosingHands':
          filterHands.push(
            ...hands.filter((hand) => hand.looser?.name === hand.hero.nick)
          );
        default:
          break;
      }
    });
    setHands(filterHands);
  };

  useEffect(() => {
    getHandsAction().then((response) => {
      setHands(response);
    });
  }, []);

  const loadHands = () => {
    getHandsAction().then((response) => {
      setHands(response);
    });
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      try {
        const file = new File([text], 'history.txt', { type: 'text/plain' });
        await uploadHandsAction(file);
      } catch (error) {
        console.error('Upload Failed 1:', error);
      }
      const response = await getHandsAction();
      setHands(response);
    } catch (error) {
      console.error('Upload Failed:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Block
      display='flex'
      direction='column'
      align='center'
      width='100%'
      height='100%'
      position='relative'
      justify='space-between'
      pt='l'
      pr='l'
      pb='l'
      pl='l'
      customStyles={{ overflowY: 'auto' }}
    >
      <Block
        display='flex'
        direction='column'
        customStyles={{ maxWidth: '500px' }}
      >
        <Text as='h4' textAlign='center' fontSize='tiny' weight='bold' mb='m'>
          Upload your poker hands
        </Text>
        <Text mb='m'>
          Paste your hand history or directly upload a .txt file with your hand
          history and we&apos;ll convert it into a replay for you to share with
          others.
        </Text>
        <StyledForm onSubmit={handleUpload}>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Paste your hand history to upload...'
            rows={4}
            name=''
            cols={10}
          />
          <Block display='flex' justify='center' mt='m' mb='m'>
            <Button
              type='submit'
              disabled={loading}
              variant='default'
              size='m'
              text={loading ? 'Uploading...' : 'Upload'}
              color='green'
            />
          </Block>
        </StyledForm>
      </Block>
      <Block mt='m'>
        <Block display='flex' justify='center' mb='m'>
          <HandListFilters
            filterHandsByCriteria={filterHandsByCriteria}
            loadHands={loadHands}
          />
        </Block>
        {hands?.length ? <UploadedHandsList hands={hands} /> : null}
      </Block>
    </Block>
  );
};

export default HistoryUploadComponent;
