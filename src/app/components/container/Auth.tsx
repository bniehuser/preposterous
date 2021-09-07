import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authorize } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const Auth: FC = () => {
  const storedUser = useAppSelector(state => state.auth.username);
  const [username, setUsername] = useState(storedUser);
  const [passwd, setPasswd] = useState<string>('');
  const dispatch = useAppDispatch();
  const history = useHistory();

  const doLogin = () => {
    dispatch(authorize({
      UserName: username as string,
      Password: passwd as string,
    })).then(() => history.push('/'))
  }

  return (
    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', height:'100%'}}>

      <form className={'form'} style={{width:'300px'}} onSubmit={e => { e.preventDefault(); return false; }}>
        <div className={'form-component'}>
          <div className={'input'}><input type={'text'} placeholder={'FIO Username'} value={username} onChange={e => setUsername(e.target.value)}/></div>
        </div>
        <div className={'form-component'}>
          <div className={'input'}><input type={'password'} placeholder={'FIO Password'} value={passwd} onChange={e => setPasswd(e.target.value)}/></div>
        </div>
        <div className={'form-component'}>
          <div className={'input'}><button className={'btn btnPrimary'} onClick={doLogin}>Login</button></div>
        </div>
      </form>
    </div>
  );
}
