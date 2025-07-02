'use client';
import Block from '../block/Block';
import Modal from '../modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { authModalHandler, AuthModalState } from '@/lib/redux/auth/auth_modal.slice';
import { selectAuthModalState } from '@/lib/redux/auth/auth_modal.selector';
import Button from '../button/Button';
import Text from '../text/Text';
import { useRouter } from 'next/navigation';
import { selectUserState } from '@/lib/redux/user/user.slector';
import { logOutUser } from '@/lib/redux/user/user.thunk';

const AuthModal = () => {  
  const { 
    isOpen, 
  } = useSelector<
  DefaultState,
  AuthModalState
  >(selectAuthModalState);
    const dispatch = useDispatch<DispatchAction>();
    const router = useRouter();
    const { user } = useSelector(selectUserState);

    const onLoginLogutHandler = () => {
        if (!user) {
            router.push(`/login`, { scroll: true })
        } else {
            dispatch(logOutUser())
        }
        dispatch(authModalHandler())
    }

    return (
    <>
        {/* <Backdrop isVisible={statsModalData?.isOpen} hasButton onClose={() => statsModalHandler()} /> */}
        <Modal isOpen={isOpen} onClose={() => dispatch(authModalHandler())}>
        <Block
            display='flex'
            direction='column'
            justify='space-around'
            align='center'
            customStyles={{ minWidth: '200px', padding: '0.5rem', minHeight: '150px' }}
        >
            <Button 
            text={user ? 'LOGOUT' : 'LOGIN'}
            variant='default'
            size='s'
            onClick={() => onLoginLogutHandler()}
            color='grey'
            />
            <Text fontSize='tiny' as='h5'>{`Don't have an account yet?`}</Text>
            <Button 
            text='SIGN UP'
            variant='default'
            size='s'
            onClick={() => {
                dispatch(authModalHandler())
                router.push(`/sign-up`, { scroll: true })
                }
            }
            color='grey'
            />
        </Block>
        </Modal>
    </>
    );
}

export default AuthModal;
