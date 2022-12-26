import React from 'react'

import { useAppSelector } from '../../../app/store'

import { BasicModal } from './BasicModal'

export const PackModal = () => {
  const title = useAppSelector(state => state.modal.title)

  return (
    <BasicModal>
      {title === 'Add new Pack' && <div>wewrwerqwerqwerq</div>}
      {title === 'Edit pack' && <div>..,z,z,xcz</div>}
    </BasicModal>
  )
}
