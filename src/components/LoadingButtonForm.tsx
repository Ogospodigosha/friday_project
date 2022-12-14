import { FC } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'

import { RequestStatusType } from '../app/appReducer'
import s from '../features/auth/registration/Registration.module.css'

type LoadingButtonTransitionPropsType = {
  IsLoading: RequestStatusType
  title: string
}
export const LoadingButtonForm: FC<LoadingButtonTransitionPropsType> = ({ IsLoading, title }) => {
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
        {IsLoading !== 'loading' && <>{title}</>}
      </LoadingButton>
    </>
  )
}
