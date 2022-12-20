import React, { ChangeEvent, useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { UniversalSort } from '../../../components/filtration/UniversalSort'
import { PATH } from '../../../components/pages/Pages'
import { UniversalPagination } from '../../../components/pagination/UniversalPagination'
import { useDebounce } from '../../../utils/hookUseDebounce'

import { createPackTC } from './createPackTC'
import { deletePackTC } from './deletePackTC'
import { editPackTC } from './editPackTC'
import { getPacksTC } from './getPacksTC'
// import { changePackNameAC } from './packs-reducer'
import { setPackNameAC, setPageAC, setPageCountAC, setSortAC } from './packs-reducer'
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
  const sort = useAppSelector(state => state.packs.sort)
  const packName = useAppSelector(state => state.packs.packName)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [isMyPack, page, pageCount, sort, useDebounce(packName)])

  const onChangeCallback = (newPage: number, newCountForPage: number) => {
    dispatch(setPageAC(newPage))
    dispatch(setPageCountAC(newCountForPage))
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
  const onChangeSort = (newSort: string) => {
    dispatch(setSortAC(newSort))
  }
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPackNameAC(e.currentTarget.value))
  }
  const SchoolIconHandler = (id: string) => {
    navigate(PATH.CARDS)
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
            onChange={handler}
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
        <SwitchMyAll />
      </div>
      <UniversalPagination
        totalCount={totalCount}
        page={page}
        pageCount={pageCount}
        onChange={onChangeCallback}
      />
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>
                Last Updated
                <UniversalSort sort={sort} value={'updated'} onClick={onChangeSort} />
              </TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>

          <TableBody>
            {packs.map(raw => (
              <TableRow key={raw._id}>
                <TableCell>{raw.name}</TableCell>
                <TableCell>{raw.cardsCount}</TableCell>
                <TableCell>{editableDate(raw.updated)}</TableCell>
                <TableCell>{raw.user_name}</TableCell>
                <TableCell sx={{ width: '150px' }}>
                  {isMyPack ? (
                    <div>
                      <IconButton>
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
                    <IconButton>
                      <SchoolIcon />
                    </IconButton>
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
        onChange={onChangeCallback}
      />
    </div>
  )
}
