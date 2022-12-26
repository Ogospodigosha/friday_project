import React from 'react'

import { useAppSelector } from '../../../app/store'

import { BasicModal } from './BasicModal'
import { CreatePackModalBody } from './createPackModalBody/CreatePackModalBody'
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
    </BasicModal>
  )
}
