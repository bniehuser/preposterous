import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const Head: FC = () => {
  const dispatch = useAppDispatch();
  const history  = useHistory();
  const auth = useAppSelector(s => s.auth);
  return (
    <div className={'head-container'}>
      <div>
        <div className={'head-item'}>
          <span className={'label'}>Might be a screen switcher?  Maybe not?</span>
          <div className={'indicator indicatorSecondary'}/>
        </div>
      </div>
      <div>
        {auth.token ? (
          <div className={'head-item'} onClick={() => dispatch(logout())}>
            <span className={'label'}>Logout ({auth.username})</span>
            <div className={'indicator indicatorSecondary'}/>
          </div>
        ) : (
          <div className={'head-item'} onClick={() => history.push('/login')}>
            <span className={'label'}>Login</span>
            <div className={'indicator indicatorSecondaryPulse'}/>
          </div>
        )}
      </div>
    </div>
  );
}
