import React from 'react'

import { useAppSelector } from '../../../app/store'

import { BasicModal } from './BasicModal'
import { CreatePackModalBody } from './createPackModalBody/CreatePackModalBody'
import { DeleteModalBody } from './deleteModalBody/DeleteModalBody'
import { UpdateModalBody } from './updateModalBody/UpdateModalBody'

type PropType = {
  dataForUpdateModal?: { id: string; name: string }
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
      {title === 'Add new card' && <div>asdfdsf</div>}
    </BasicModal>
  )
}
