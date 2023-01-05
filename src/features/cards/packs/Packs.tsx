import React, { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import SchoolIcon from '@mui/icons-material/School'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import Button from '@mui/material/Button'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { Filtration } from '../../../components/filtration/Filtration'
import { PATH } from '../../../components/pages/Pages'
import { RangeSlider } from '../../../components/rangeSliger/RangeSlider'
import { Search } from '../../../components/search/Search'
import { SuperPagination } from '../../../components/superPagination/SuperPagination'
import { SwitchMyAll } from '../../../components/switchMyAll/SwitchMyAll'
import { getPacksSearchParams } from '../../../utils/getPacksSearchParams'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { setCardsPackIdToLearnAC } from '../../learn/learnReducer'
import { style } from '../cards/BasicTable/styleSXForBasicTable'
import { setCurrentPackIdAC } from '../cards/cardsReducer'
import { openModal } from '../modals/modalReducer'
import { PackModal } from '../modals/PackModal'

import { getPacksTC } from './getPacksTC'
import s from './packs.module.css'

export const Packs = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const packs = useAppSelector(state => state.packs.packs.cardPacks)
  const totalCount = useAppSelector(state => state.packs.packs.cardPacksTotalCount)
  const user_id = useAppSelector(state => state.app.user._id)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const min = useAppSelector(state => state.packs.packs.minCardsCount)
  const max = useAppSelector(state => state.packs.packs.maxCardsCount)

  const [dataForUpdateModal, setDataForUpdateModal] = useState({ id: '', name: '' })

  useEffect(() => {
    dispatch(getPacksTC(getPacksSearchParams(searchParams)))
  }, [useDebounce(searchParams)])

  const deleteAllQuery = () => {
    setSearchParams({})
  }
  const editableDate = (updated: string) => {
    let newUpdated = updated.split('T')[0].split('-')
    let years = newUpdated.shift()

    if (years) {
      newUpdated.push(years)
    }

    return newUpdated.join('.')
  }
  const createPack = () => {
    dispatch(openModal('Add new Pack'))
  }

  const deletePack = (id: string, name: string) => {
    setDataForUpdateModal({ id: id, name: name })
    dispatch(openModal('Delete pack'))
  }
  const editPack = (id: string, name: string) => {
    setDataForUpdateModal({ id: id, name: name })
    dispatch(openModal('Edit pack'))
  }
  const showCardsHandler = (id: string) => {
    dispatch(setCurrentPackIdAC(id))
    navigate(PATH.CARDS)
  }
  const learningPackHandler = (id: string) => {
    dispatch(setCardsPackIdToLearnAC(id))
    navigate(PATH.LEARN)
  }
  const disabledSchool = (id: string) => {
    let currentPack = packs.find(el => el._id === id)

    return currentPack && currentPack.cardsCount === 0
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <div className={s.header}>
        <PackModal dataForUpdateModal={dataForUpdateModal} />

        <div className={s.description}>Packs list</div>
        <Button
          onClick={createPack}
          variant={'contained'}
          className={s.button}
          style={{ textTransform: 'none', borderRadius: '30px' }}
        >
          Add new pack
        </Button>
      </div>
      <div className={s.navigation}>
        <div className={s.searchContainer}>
          <Search type={'packName'} />
        </div>
        <SwitchMyAll />
        <RangeSlider min={min} max={max} />
        <div className={s.filter}>
          <IconButton onClick={deleteAllQuery}>
            <FilterAltOffIcon />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow style={{ background: '#EFEFEF' }}>
              <TableCell>Cover</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell sx={style.tableHeadTableCell}>
                <Filtration title={'Last Updated'} type={'sortPacks'} />
              </TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>

          <TableBody>
            {packs.map(raw => (
              <TableRow key={raw._id} hover={true}>
                <TableCell>{''}</TableCell>
                <TableCell
                  sx={style.tableRowTableCell}
                  style={{ cursor: 'pointer' }}
                  onClick={() => showCardsHandler(raw._id)}
                >
                  {raw.name}
                </TableCell>
                <TableCell>{raw.cardsCount}</TableCell>
                <TableCell>{editableDate(raw.updated)}</TableCell>
                <TableCell>{raw.user_name}</TableCell>
                <TableCell sx={{ width: '160px' }}>
                  {user_id === raw.user_id ? (
                    <div>
                      <IconButton
                        onClick={() => learningPackHandler(raw._id)}
                        disabled={disabledSchool(raw._id)}
                      >
                        <SchoolIcon />
                      </IconButton>
                      <IconButton onClick={() => editPack(raw._id, raw.name)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deletePack(raw._id, raw.name)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div>
                      <IconButton
                        disabled={disabledSchool(raw._id)}
                        onClick={() => learningPackHandler(raw._id)}
                      >
                        <SchoolIcon />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SuperPagination totalCount={totalCount} />
    </div>
  )
}
