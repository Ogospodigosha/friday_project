import { instance } from './instance'

export const learnApi = {
  updateGrade(data: UpdateGradeType) {
    return instance.put<UpdatedGradeResponseType>('cards/grade', data)
  },
}

type UpdateGradeType = {
  grade: number
  card_id: string
}

type UpdatedGradeResponseType = {
  token: string
  tokenDeathTime: number

  updateGrade: UpdatedGradeType
}

type UpdatedGradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
