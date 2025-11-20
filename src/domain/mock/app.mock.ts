import Mock from '@common/configs/mock.config';
import { absolute } from '@utils/urls.util';

Mock.onPost(absolute((api) => api.authentication.login)).reply(
  200,
  {
    id: 1,
    email: 'admin@template.com',
    isEnabled: true,
    token: 'gre56g65er4g5e64g6e5r4g56er4ger6',
  },
  2000,
);
