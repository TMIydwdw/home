import Joi from 'joi'
import { WithdrawalMethodStatus } from '../withdrawalMethod/withdrawalMethod.enum'

const create = Joi.object({})

const update = Joi.object({})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(WithdrawalMethodStatus))
    .required(),
})

export default { create, update, updateStatus }
