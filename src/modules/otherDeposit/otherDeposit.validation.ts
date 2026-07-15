import Joi from 'joi'
import { DepositStatus } from '@/modules/deposit/deposit.enum'
import { OtherDepositMethodType } from '../otherDepositMethod/otherDepositMethod.enum'

const create = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string()
    .trim()
    .valid(...Object.values(OtherDepositMethodType))
    .required(),
})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(DepositStatus.APPROVED, DepositStatus.CANCELLED)
    .required(),
})

export default { create, updateStatus }
