import request from '@/utils/request.js';

// 领取交易
export const transactionCreateApi = (data) => {
  return request.post('/api/transaction/create', data);
};
