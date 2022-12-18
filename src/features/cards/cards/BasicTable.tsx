import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../app/store'

import { style } from './styleSXForBasicTable'

export default function BasicTable() {
  const cardPacks = useAppSelector(state => state.cards.cards)
  const convertDataFormat = (value: string) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(value))
  }

  return cardPacks ? (
    <TableContainer component={Paper} sx={style.container}>
      <Table sx={style.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(card => (
            <TableRow key={card._id} sx={style.tableRow}>
              <TableCell component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell align="right">{card.answer}</TableCell>
              <TableCell align="right">{convertDataFormat(card.updated)}</TableCell>
              <TableCell align="right">{card.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>
      <div>This pack is empty. Click add new card to fill this pack</div>
    </div>
  )
}
