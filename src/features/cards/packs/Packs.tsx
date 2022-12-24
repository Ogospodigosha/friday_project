import React, { ChangeEvent, useEffect } from 'react'

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
import { UniversalDoubleRange } from '../../../components/doubleRange/UniversalDoubleRange'
import { UniversalSort } from '../../../components/filtration/UniversalSort'
import { PATH } from '../../../components/pages/Pages'
import { UniversalPagination } from '../../../components/pagination/UniversalPagination'
import { useDebounce } from '../../../utils/hookUseDebounce'
import { style } from '../cards/BasicTable/styleSXForBasicTable'
import { setCurrentPackIdAC } from '../cards/cardsReducer'

import { createPackTC } from './createPackTC'
import { deletePackTC } from './deletePackTC'
import { editPackTC } from './editPackTC'
import { getPacksTC } from './getPacksTC'
import { changeIsMyPack } from './IsMyPackReducer-reducer'
import {
  setIsMyPackAC,
  setLocalRangeAC,
  setPackNameAC,
  setPageAC,
  setPageCountAC,
  setSortAC,
} from './packs-reducer'
import s from './packs.module.css'
import { SwitchMyAll } from './SwitchMyAll'

export const Packs = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const isMyPack = useAppSelector(state => state.packs.isMyPack)
  const packs = useAppSelector(state => state.packs.packs.cardPacks)
  const page = useAppSelector(state => state.packs.packs.page)
  const pageCount = useAppSelector(state => state.packs.packs.pageCount)
  const totalCount = useAppSelector(state => state.packs.packs.cardPacksTotalCount)
  const sortPacks = useAppSelector(state => state.packs.sort)
  const packName = useAppSelector(state => state.packs.packName)
  let user_id = useAppSelector(state => state.app.user._id)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const min = useAppSelector(state => state.packs.packs.minCardsCount)
  const max = useAppSelector(state => state.packs.packs.maxCardsCount)
  const localRange = useAppSelector(state => state.packs.localRange)
  const isMyPack1 = useAppSelector(state => state.isMyPack.isMyPack1)

  const params = Object.fromEntries(searchParams)
  let aligmentState = JSON.parse(localStorage.getItem('alignment') as string)

  console.log(params)
  useEffect(() => {
    if (aligmentState === 'my' && isMyPack1 === 'false') {
      // dispatch(setIsMyPackAC(true))
      dispatch(changeIsMyPack('true'))
    }
  }, [])
  console.log('isMyPack', isMyPack)
  useEffect(() => {
    setSearchParams(params)
    dispatch(getPacksTC(params))
  }, [
    useDebounce(localRange),
    localStorage.getItem('isMyPack1'),
    page,
    pageCount,
    sortPacks,
    useDebounce(packName),
    user_id,
  ])

  // useEffect(() => {
  //   !packs?.length && dispatch(setPageAC(page - 1)) && searchParams.delete('page')
  // }, [totalCount])

  const deleteAllQwery = () => {
    setSearchParams({})
    dispatch(setPageCountAC(10))
    dispatch(setPageAC(1))
    dispatch(setSortAC('0updated'))
    dispatch(setPackNameAC(''))
    dispatch(setIsMyPackAC(false))
    dispatch(setLocalRangeAC([min, max]))
    window.localStorage.setItem('alignment', JSON.stringify('all'))
    dispatch(changeIsMyPack('false'))
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
      name: 'ffffffffffffffffffffffffffffffff sasfadsfas               sdafsdfasdfasdfasdfsdafasdfffffffffffffffffffffffffffffffffffffffffffff',
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
  const switchCallback = (my: boolean) => {
    if (my) {
      searchParams.set('user_id', user_id.toString())
      // dispatch(setIsMyPackAC(my))
    } else {
      searchParams.delete('user_id')
      // dispatch(setIsMyPackAC(my))
    }
  }

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
        <SwitchMyAll switchCallback={switchCallback} params={params} />
        <UniversalDoubleRange min={min} max={max} />
        <div className={s.filter}>
          <IconButton onClick={deleteAllQwery}>
            <FilterAltOffIcon />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow style={{ background: '#EFEFEF' }}>
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
              <TableRow key={raw._id} hover={true}>
                <TableCell
                  sx={style.tableRowTableCell}
                  style={{ cursor: 'pointer' }}
                  onClick={() => learningPackHandler(raw._id)}
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
