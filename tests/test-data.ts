export const credentials = {
  valid: {
    email: 'mastermadhav001@gmail.com',
    password: 'Secrets123',
  },
  invalid: {
    email: 'wrong.user@example.com',
    password: 'wrongpass',
  },
  malformedEmail: 'invalid-email',
  reset: {
    email: 'test.user@example.com',
    password: 'Password@123',
    confirmPassword: 'Password@456',
  },
};

export const dashboard = {
  search: {
    keyword: 'iphone',
    noResult: 'zzz-no-match-product',
  },
  price: {
    min: '1000',
    max: '60000',
  },
  categories: {
    fashion: 0,
    electronics: 1,
    household: 2,
  },
};
