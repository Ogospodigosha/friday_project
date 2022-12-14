import * as React from 'react'
import { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Filtration } from '../../../../components/filtration/Filtration'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'

import s from './BasicTable.module.css'
import { style } from './styleSXForBasicTable'

type BasicTableProps = {
  deleteCardOnClick: (value: string) => void
  updateCardOnClick: (value: string, question: string, answer: string) => void
}

export const BasicTable: FC<BasicTableProps> = ({ deleteCardOnClick, updateCardOnClick }) => {
  const cardPacks = useAppSelector(state => state.cards.cards)
  const myId = useAppSelector(state => state.app.user._id)
  const disabledDeleteButton = useAppSelector(state => state.app.status)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)

  const convertDataFormat = (value: string) => {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(value))
  }

  return cardPacks?.length ? (
    <TableContainer component={Paper} sx={style.container}>
      <Table sx={style.table} aria-label="simple table">
        <TableHead sx={style.tableHead}>
          <TableRow>
            <TableCell sx={style.tableHeadTableCell}>Question</TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right">
              Answer
            </TableCell>
            <TableCell sx={style.tableHeadTableCell} align="right">
              <Filtration title={'Last Updated'} type={'sortCards'} />
            </TableCell>
            <TableCell sx={style.tableHeadTableCell} align="center">
              Grade
            </TableCell>
            {myId === currantPackUserId ? (
              <TableCell sx={style.tableHeadTableCell} align="right"></TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(card => (
            <TableRow key={card._id} sx={style.tableRow}>
              <TableCell sx={style.tableRowTableCell} component="th" scope="row">
                {card.questionImg ? (
                  <img src={card.questionImg} className={s.cardCover} alt={'cardCover'} />
                ) : (
                  <div>{card.question}</div>
                )}
              </TableCell>
              <TableCell sx={style.tableRowTableCell} align="right">
                {card.answer}
              </TableCell>
              <TableCell sx={style.tableRowTableCell} align="right">
                {convertDataFormat(card.updated)}
              </TableCell>
              <TableCell align="center">
                <Rating
                  sx={style.tableRowStars}
                  name="read-only"
                  readOnly
                  value={card.grade}
                  precision={0.2}
                  size="medium"
                />
              </TableCell>
              {myId === currantPackUserId ? (
                <TableCell sx={style.editDelete} align="right">
                  <IconButton
                    onClick={() => updateCardOnClick(card._id, card.question, card.answer)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteCardOnClick(card._id)}
                    disabled={disabledDeleteButton === 'loading'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className={s.wrappedEmptyPack}>
      <div className={s.title}>
        This pack is empty. Click add new card to fill this pack or created your own pack
      </div>
    </div>
  )
}
