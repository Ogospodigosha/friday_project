import React, { ChangeEvent, useCallback, useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import SchoolIcon from '@mui/icons-material/School'
import SearchIcon from '@mui/icons-material/Search'
import {
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material'
import Button from '@mui/material/Button'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { UniversalSort } from '../../../components/filtration/UniversalSort'
import { PATH } from '../../../components/pages/Pages'
import { UniversalPagination } from '../../../components/pagination/UniversalPagination'
import { useDebounce } from '../../../utils/hookUseDebounce'
import { setCurrentPackIdAC } from '../cards/cardsReducer'

import { createPackTC } from './createPackTC'
import { deletePackTC } from './deletePackTC'
import { editPackTC } from './editPackTC'
import { getPacksTC } from './getPacksTC'
import { setIsMyPackAC, setPackNameAC, setPageAC, setPageCountAC, setSortAC } from './packs-reducer'
import s from './packs.module.css'
import { SwitchMyAll } from './SwitchMyAll'

export const Packs = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMyPack = useAppSelector(state => state.packs.isMyPack)
  const packs = useAppSelector(state => state.packs.packs.cardPacks)
  const page = useAppSelector(state => state.packs.packs.page)
  const pageCount = useAppSelector(state => state.packs.packs.pageCount)
  const totalCount = useAppSelector(state => state.packs.packs.cardPacksTotalCount)
  const sortPacks = useAppSelector(state => state.packs.sort)
  const packName = useAppSelector(state => state.packs.packName)
  let user_id = useAppSelector(state => state.app.user._id)

  console.log('isMyPack', isMyPack)
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  const params = Object.fromEntries(searchParams)

  useEffect(() => {
    setSearchParams(params)
    dispatch(getPacksTC(params))
  }, [isMyPack, page, pageCount, sortPacks, useDebounce(packName), user_id])
  const deleteAllQwery = () => {
    searchParams.delete('page')
    searchParams.delete('pageCount')
    searchParams.delete('sortPacks')
    searchParams.delete('packName')
    searchParams.delete('user_id')
    console.log(params)
    dispatch(setPageCountAC(10))
    dispatch(setPageAC(1))
    dispatch(setSortAC('0updated'))
    dispatch(setPackNameAC(''))
    dispatch(setIsMyPackAC(null))
    console.log(isMyPack)
  }

  const onChangePagination = (newPage: number, newCountForPage: number) => {
    dispatch(setPageAC(newPage))
    dispatch(setPageCountAC(newCountForPage))
    searchParams.set('page', newPage.toString())
    searchParams.set('pageCount', newCountForPage.toString())
  }
  const editableDate = (updated: string) => {
    let newUpdated = updated.split('T')[0].split('-')
    let years = newUpdated.shift()

    if (years) {
      newUpdated.push(years)
    }

    return newUpdated.join('.')
  }
  const data = {
    cardsPack: {
      name: '55',
    },
  }
  const createPack = () => {
    dispatch(createPackTC(data))
  }
  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }
  const editPack = (id: string) => {
    dispatch(editPackTC(id))
  }
  const onChangeSortHandler = (newSort: string) => {
    dispatch(setSortAC(newSort))
    searchParams.set('sortPacks', newSort)
  }
  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackNameAC(e.currentTarget.value))
    searchParams.set('packName', e.currentTarget.value)
  }
  const learningPackHandler = (id: string) => {
    dispatch(setCurrentPackIdAC(id))
    navigate(PATH.CARDS)
  }
  const schoolHandler = (id: string) => {}
  const disabledSchool = (id: string) => {
    let currentPack = packs.find(el => el._id === id)

    return currentPack && currentPack.cardsCount === 0
  }
  const switchCallback = useCallback((my: boolean) => {
    if (my) {
      searchParams.set('user_id', user_id.toString())
      dispatch(setIsMyPackAC(my))
    } else {
      debugger
      searchParams.delete('user_id')
      dispatch(setIsMyPackAC(my))
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <div className={s.header}>
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
      <div className={s.search}>
        <span>Search</span>
      </div>
      <div className={s.navigation}>
        <div style={{ marginRight: '20px' }}>
          <TextField
            className={s.input}
            size="small"
            value={packName}
            onChange={onSearchInputHandler}
            placeholder={'Provide your text'}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div style={{ marginRight: '335px' }}>
          <SwitchMyAll switchCallback={switchCallback} />
        </div>
        <IconButton onClick={deleteAllQwery}>
          <FilterAltOffIcon />
        </IconButton>
      </div>
      <UniversalPagination
        totalCount={totalCount}
        page={page}
        pageCount={pageCount}
        onChange={onChangePagination}
      />
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>
                Last Updated
                <UniversalSort sort={sortPacks} value={'updated'} onClick={onChangeSortHandler} />
              </TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>

          <TableBody>
            {packs.map(raw => (
              <TableRow key={raw._id}>
                <TableCell
                  onClick={() => learningPackHandler(raw._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {raw.name}
                </TableCell>
                <TableCell>{raw.cardsCount}</TableCell>
                <TableCell>{editableDate(raw.updated)}</TableCell>
                <TableCell>{raw.user_name}</TableCell>
                <TableCell sx={{ width: '150px' }}>
                  {user_id === raw.user_id ? (
                    <div>
                      <IconButton
                        onClick={() => learningPackHandler(raw._id)}
                        disabled={disabledSchool(raw._id)}
                      >
                        <SchoolIcon />
                      </IconButton>
                      <IconButton onClick={() => editPack(raw._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deletePack(raw._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div>
                      <IconButton disabled={disabledSchool(raw._id)}>
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
      <UniversalPagination
        totalCount={totalCount}
        page={page}
        pageCount={pageCount}
        onChange={onChangePagination}
      />
    </div>
  )
}
