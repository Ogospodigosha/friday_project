import * as React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../app/store'

import s from './BasicTable.module.css'
import { style } from './styleSXForBasicTable'

type BasicTableProps = {
  deleteCardOnClick: (value: string) => void
  updateCardOnClick: (value: string) => void
}

export default function BasicTable(props: BasicTableProps) {
  const cardPacks = useAppSelector(state => state.cards.cards)
  const convertDataFormat = (value: string) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(value))
  }

  return cardPacks ? (
    <TableContainer component={Paper} sx={style.container}>
      <Table sx={style.table} aria-label="simple table">
        <TableHead sx={style.tableHead}>
          <TableRow>
            <TableCell sx={style.tableHeadTableCell}>Question</TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right">
              Answer
            </TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right">
              Last Updated
            </TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right">
              Grade
            </TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(card => (
            <TableRow key={card._id} sx={style.tableRow}>
              <TableCell sx={style.tableRowTableCell} component="th" scope="row">
                {card.question}
              </TableCell>
              <TableCell sx={style.tableRowTableCell} align="right">
                {card.answer}
              </TableCell>
              <TableCell sx={style.tableRowTableCell} align="right">
                {convertDataFormat(card.updated)}
              </TableCell>
              <TableCell sx={style.tableRowTableCell} align="right">
                {card.grade}
              </TableCell>
              <TableCell sx={style.editDelete} align="right">
                <EditIcon onClick={() => props.updateCardOnClick(card._id)} />
                <DeleteIcon onClick={() => props.deleteCardOnClick(card._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className={s.wrappedEmptyPack}>
      <div className={s.namePack}>Lorem ipsum</div>
      <div className={s.title}>This pack is empty. Click add new card to fill this pack</div>
      <Button variant="contained" sx={style.addNewCard}>
        <span className={s.btnTitle}>Add new card</span>
      </Button>
    </div>
  )
}
