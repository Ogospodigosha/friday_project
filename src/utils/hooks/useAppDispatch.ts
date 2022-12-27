import { useDispatch } from 'react-redux'

import { AppThunkDispatch } from '../../app/store'

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
