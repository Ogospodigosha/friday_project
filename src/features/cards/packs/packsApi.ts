import { instance } from '../../../api/instance'

import { PackType, ParamsModelType } from './packs-reducer'

export const packsApi = {
  getPacks(params: ParamsModelType) {
    return instance.get('cards/pack', {
      params: { ...params },
    })
  },
  cratePack(data: createDataType) {
    return instance.post('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete('cards/pack', { params: { id: id } })
  },
  editPack(data: editDataType) {
    return instance.put('cards/pack', data)
  },
}

export type createDataType = {
  cardsPack: {
    name?: string
    private?: boolean
  }
}
export type editDataType = {
  cardsPack: {
    name?: string
    _id: string
  }
}
type ResponseDataCreateType = {
  newCardsPack: PackType
}
