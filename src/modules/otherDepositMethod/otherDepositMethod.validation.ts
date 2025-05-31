import Joi from 'joi'
import { OtherDepositMethodStatus } from './otherDepositMethod.enum'

const create = Joi.object({})

const update = Joi.object({})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(OtherDepositMethodStatus))
    .required(),
})

export default { create, update, updateStatus }
