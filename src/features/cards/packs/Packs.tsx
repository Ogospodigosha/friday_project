import React, { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { createPackTC, deletePackTC, getPacksTC } from './packs-reducer'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)
  const { token } = useParams()

  console.log(packs)
  useEffect(() => {
    dispatch(getPacksTC())
  }, [])
  const onClickHandler = () => {
    console.log(1)
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

  return (
    <TableContainer component={Paper}>
      <Button onClick={createPack}>create pack</Button>
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
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => deletePack(raw._id)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
