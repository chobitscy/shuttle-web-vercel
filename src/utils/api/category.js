import {get} from "@/utils/request/request";

const API = '/major/category/';

export const findCategoryByServiceId = (serviceId) => get(API + 'findAllByServiceId/' + serviceId);