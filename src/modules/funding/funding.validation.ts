import Joi from 'joi'
import { FundingStatus } from '@/modules/funding/funding.enum'

const create = Joi.object({
  depositMethodId: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(FundingStatus.APPROVED, FundingStatus.CANCELLED)
    .required(),
})

export default { create, updateStatus }
