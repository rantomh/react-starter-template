import Mock, { mockInstance } from '@common/configs/mock.config';
import './app.mock';

Mock.onAny().passThrough();

export { mockInstance };
