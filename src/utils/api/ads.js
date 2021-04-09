import {get} from "@/utils/request/request";

const API = '/major/poster/';

export const findAllAds = () => get(API + 'findAll');