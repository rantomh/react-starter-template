interface Config {
  backend: string;
  mocker: string;
}

export const mode = import.meta.env.MODE;

const config: Config = {
  backend: import.meta.env.VITE_API_URL,
  mocker: import.meta.env.VITE_MOCKER_URL,
};

export default Object.freeze(config);
