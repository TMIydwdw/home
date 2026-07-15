import Joi from 'joi'
import { WithdrawalStatus } from '../withdrawal/withdrawal.enum'

const create = Joi.object({})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(WithdrawalStatus))
    .required(),
})

export default { create, updateStatus }
