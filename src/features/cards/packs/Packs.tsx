import React, { useEffect } from 'react'

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
import { createSearchParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { UniversalPagination } from '../../../components/pagination/UniversalPagination'

import { createPackTC, deletePackTC, editPackTC, getPacksTC } from './packs-reducer'
import s from './packs.module.css'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const packs = useAppSelector(state => state.packs.cardPacks)
  const totalCount = useAppSelector(state => state.packs.totalCount)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    dispatch(getPacksTC({ page: +params.page || 1, pageCount: +params.count || 10 }))
  }, [])

  // callback that change searchParams
  const onChangeCallback = (newPage: number, newCountForPage: number) => {
    dispatch(getPacksTC({ page: newPage, pageCount: newCountForPage }))
    setSearchParams(
      createSearchParams({
        page: newPage.toString(),
        count: newCountForPage.toString(),
      })
    )
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
        <TextField
          className={s.input}
          size="small"
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
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>Last Updated</TableCell>
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
                <TableCell>
                  <IconButton>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton onClick={() => editPack(raw._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deletePack(raw._id)}>
                    <DeleteIcon />
                  </IconButton>
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
