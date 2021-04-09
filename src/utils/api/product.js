import {get, post} from '@/utils/request/request'

const API = '/major/product/';

// 根据storeId查询products
export const findProductsByStoreId = (storeId) => get(API + 'findByStoreId/' + storeId);

// 排行榜
export const findPopularProduct = () => get(API + 'rank');

// 搜索
export const searchProduct = (keywords) => get(API + 'search/' + keywords);
export const review = (params) => post(API + 'review', params);