import {get} from '@/utils/request/request'

export const findAllService = () => get('/major/service/findAll?order=ASC');