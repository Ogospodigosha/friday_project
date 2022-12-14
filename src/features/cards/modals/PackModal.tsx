import React from 'react'

import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import { BasicModal } from './BasicModal'
import { CreateCardModalBody } from './createCardModalBody/CreateCardModalBody'
import { CreatePackModalBody } from './createPackModalBody/CreatePackModalBody'
import { DeleteCardModalBody } from './deleteCardModalBody/DeleteCardModalBody'
import { DeleteModalBody } from './deletePackModalBody/DeleteModalBody'
import { UpdateCardModalBody } from './updateCardModalBody/UpdateCardModalBody'
import { UpdateModalBody } from './updatePackModalBody/UpdateModalBody'

type PropType = {
  dataForUpdateModal?: { id: string; name: string }
  dataForUpdateCard?: { cardId: string; question: string; answer: string }
  cardsPack_id?: string
  setFile64?: (file64: string) => void
  file64?: string
  deckCover?: string
  setDeckCover?: (deckCover: string) => void
}
export const PackModal = (props: PropType) => {
  const title = useAppSelector(state => state.modal.title)

  return (
    <BasicModal>
      {title === 'Add new Pack' && props.setFile64 && props.file64 && (
        <CreatePackModalBody setFile64={props.setFile64} file64={props.file64} />
      )}
      {title === 'Edit pack' &&
        props.dataForUpdateModal &&
        props.deckCover &&
        props.setFile64 &&
        props.file64 &&
        props.setDeckCover && (
          <UpdateModalBody
            dataForUpdateModal={props.dataForUpdateModal}
            deckCover={props.deckCover}
            setFile64={props.setFile64}
            file64={props.file64}
            setDeckCover={props.setDeckCover}
          />
        )}
      {title === 'Delete pack' && props.dataForUpdateModal && (
        <DeleteModalBody dataForUpdateModal={props.dataForUpdateModal} />
      )}
      {title === 'Add new card' && props.cardsPack_id && (
        <CreateCardModalBody cardsPack_id={props.cardsPack_id} />
      )}
      {title === 'Edit card' && props.dataForUpdateCard && props.cardsPack_id && (
        <UpdateCardModalBody
          dataForUpdateCard={props.dataForUpdateCard}
          cardsPack_id={props.cardsPack_id}
        />
      )}
      {title === 'Delete card' && props.dataForUpdateCard && props.cardsPack_id && (
        <DeleteCardModalBody
          dataForUpdateCard={props.dataForUpdateCard}
          cardsPack_id={props.cardsPack_id}
        />
      )}
    </BasicModal>
  )
}
