import LoadingButton from '@mui/lab/LoadingButton'

import { RequestStatusType } from '../app/appReducer'
import s from '../features/auth/registration/registration.module.css'

type LoadingButtonTransitionPropsType = {
  IsLoading: RequestStatusType
}
export const LoadingButtonForm: React.FC<LoadingButtonTransitionPropsType> = ({ IsLoading }) => {
  return (
    <>
      <LoadingButton
        size="small"
        loading={IsLoading === 'loading'}
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
        {IsLoading !== 'loading' && <>Sign Up</>}
      </LoadingButton>
    </>
  )
}
