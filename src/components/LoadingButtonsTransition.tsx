import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

import { AppRootStateType } from '../app/store'
import s from '../features/auth/registration/registration.module.css'

export const LoadingButtonsTransition = () => {
  const IsLoading = useSelector<AppRootStateType, boolean>(state => state.registration.IsLoading)

  return (
    <>
      <LoadingButton
        size="small"
        loading={IsLoading}
        variant={'contained'}
        type={'submit'}
        className={s.button}
        style={{
          borderRadius: '30px',
          fontFamily: 'Montserrat',
          fontSize: '16px',
          fontWeight: '500',
          fontStyle: 'normal',
          lineHeight: '20px',
          color: '#FFFFFF',
          textAlign: 'center',
          textTransform: 'none',
        }}
      >
        {!IsLoading && <>Sign Up</>}
      </LoadingButton>
    </>
  )
}
