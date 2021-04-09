import {del, get, post} from '@/utils/request/request'

const API = '/major/comments/';

export const insertComments = (comments) => post(API + 'insert', comments);

export const updateComments = (comments) => post(API + 'update', comments);

export const findByStoreId = (storeId) => get(API + 'findByStoreId/' + storeId);

export const findByStoreIdAndId = (storeId, _id) => get(API + 'findByStoreId/' + storeId + '?_id=' + _id);

export const delComments = (comments) => del(API + 'delete', comments);