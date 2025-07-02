'use client';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../block/Block';
import Button from '../button/Button';
import Text from '../text/Text';
import { StyledHeader, StyledTextLink } from './HeaderStyles';
import { DispatchAction } from '@/lib/redux/store';
import { authModalHandler } from '@/lib/redux/auth/auth_modal.slice';
import { selectUserState } from '@/lib/redux/user/user.slector';

const HeaderComponent = () => {
  const dispatch = useDispatch<DispatchAction>();
  const { user } = useSelector(selectUserState)
  return (
  <StyledHeader>
    <Block
      display='flex'
      justify='space-between'
      pt='m'
      pr='s'
      pb='m'
      pl='s'
      width='100%'
    >
      <StyledTextLink href={`/`}>
        <Text isUppercase>Replayer</Text>
      </StyledTextLink>
      <Block display='flex' align='center' >
        <Text>{user?.username}</Text>
        <Button 
        variant='icon' 
        icon='account' 
        iconColor='white'
        onClick={() => dispatch(authModalHandler())}
        ml='s'
        />
      </Block>
    </Block>
  </StyledHeader>
);
}

export default HeaderComponent;
