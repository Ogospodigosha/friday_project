import React from 'react'

import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import { BasicModal } from './BasicModal'
import { CreateCardModalBody } from './createCardModalBody/CreateCardModalBody'
import { CreatePackModalBody } from './createPackModalBody/CreatePackModalBody'
import { DeleteModalBody } from './deletePackModalBody/DeleteModalBody'
import { UpdateModalBody } from './updatePackModalBody/UpdateModalBody'

type PropType = {
  dataForUpdateModal?: { id: string; name: string }

  cardsPack_id?: string
}
export const PackModal = (props: PropType) => {
  const title = useAppSelector(state => state.modal.title)

  return (
    <BasicModal>
      {title === 'Add new Pack' && <CreatePackModalBody />}
      {title === 'Edit pack' && props.dataForUpdateModal && (
        <UpdateModalBody dataForUpdateModal={props.dataForUpdateModal} />
      )}
      {title === 'Delete pack' && props.dataForUpdateModal && (
        <DeleteModalBody dataForUpdateModal={props.dataForUpdateModal} />
      )}
      {title === 'Add new card' && props.cardsPack_id && (
        <CreateCardModalBody cardsPack_id={props.cardsPack_id} />
      )}
    </BasicModal>
  )
}
