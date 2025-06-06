'use client';
import { useEffect, useState } from 'react';
import Block from '../block/Block';
import Text from '../text/Text';
import Textarea from '../textarea/Textarea';
import { StyledForm } from './HistoryUpload.styles';
import UploadedHandsList from '../uploaded_hands_list/UploadedHandsList';
import Button from '../button/Button';
import { uploadHandsAction } from '@/actions/upload_hands.action';
import { Criteria } from '@/modules/shared/domain/criteria';
import HandListFilters from '../uploaded_hands_list/HandListFilters';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { selectHandsState } from '@/lib/redux/hand/hand.selector';
import {
  filterHands,
  HandsState,
  resetFilters,
} from '@/lib/redux/hand/hand.slice';
import { fetchHands } from '@/lib/redux/hand/hand.thunk';
import { TEST_HANDS } from './test_hands';

const HistoryUploadComponent = () => {
  const { hands, filtersApplied, filteredHands } = useSelector<
    DefaultState,
    HandsState
  >(selectHandsState);
  const dispatch = useDispatch<DispatchAction>();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const filterHandsByCriteria = (criteria: Criteria) => {
    dispatch(filterHands(criteria));
  };

  useEffect(() => {
    if (!hands?.length) {
      setLoading(true);
      dispatch(fetchHands());
      setLoading(false);
    }
  }, [hands.length, dispatch]);

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
      dispatch(fetchHands());
      setText('');
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
          Paste your hand history and we&apos;ll convert it into a replay for
          you.
        </Text>
        <Text mb='m' weight='semiBold'>
          Note: the application only works with POKER STARS cash hands for now, we`ll add more features soon.
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
          <Block display='flex' justify='space-evenly' mt='m' mb='m'>
            <Button
              type='submit'
              disabled={loading}
              variant='default'
              size='m'
              text={loading ? 'Uploading...' : 'Upload'}
              color='green'
            />
            <Button
              type='button'
              disabled={loading}
              variant='default'
              size='m'
              text={loading ? 'Uploading...' : 'Use test hands'}
              color='green'
              onClick={() => setText(TEST_HANDS)}
            />
          </Block>
        </StyledForm>
      </Block>
      {
        hands?.length ? (
        <Block mt='m' customStyles={{ maxWidth: '950px' }}>
          <Block display='flex' justify='center' mb='m'>
            <HandListFilters
              filterHandsByCriteria={filterHandsByCriteria}
              resetFilters={() => dispatch(resetFilters())}
            />
          </Block>
          <UploadedHandsList hands={filtersApplied ? filteredHands : hands} />
        </Block>
        ) : null
      }
    </Block>
  );
};

export default HistoryUploadComponent;
