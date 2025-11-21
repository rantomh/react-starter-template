import Mock, { mockInstance } from '@core/configs/mock.config';
import './app.mock';

Mock.onAny().passThrough();

export { mockInstance };
