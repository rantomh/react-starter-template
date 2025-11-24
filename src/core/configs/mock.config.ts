import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const mockInstance = axios.create();

const Mock = new MockAdapter(mockInstance, { delayResponse: 300 });

export default Mock;
