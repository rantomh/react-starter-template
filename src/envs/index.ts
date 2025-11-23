interface Config {
  backend: string;
  mocker: string;
}

const config: Config = {
  backend: import.meta.env.VITE_API_URL,
  mocker: import.meta.env.VITE_MOCKER_URL,
};

export const mode = import.meta.env.MODE;
export default Object.freeze(config);
