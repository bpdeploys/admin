// export const BASE_URL =
//   process.env.NODE_ENV === 'production'
//     ? 'http://www.bp-core-api-dev.co.uk:8000/api'
//     : 'http://www.bp-core-api-dev.co.uk:8000/api';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bp-prod-api.com/api'
    : 'http://ec2-34-226-184-189.compute-1.amazonaws.com:8000/api';
