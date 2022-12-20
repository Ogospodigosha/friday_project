import { instance } from '../../../api/instance'

import { PacksType, PackType } from './packs-reducer'

export const packsApi = {
  getPacks(
    userId: string,
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    pageCount?: number,
    page?: number
  ) {
    return instance.get<PacksType>('cards/pack', {
      params: { user_id: userId, packName, min, max, sortPacks, pageCount, page },
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
//types
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
