import React from 'react'

import { useAppSelector } from '../../../app/store'

import { BasicModal } from './BasicModal'
import { CreatePackModalBody } from './createPackModalBody/CreatePackModalBody'

export const PackModal = () => {
  const title = useAppSelector(state => state.modal.title)

  return (
    <BasicModal>
      {title === 'Add new Pack' && <CreatePackModalBody />}
      {title === 'Edit pack' && <div>..,z,z,xcz</div>}
    </BasicModal>
  )
}
