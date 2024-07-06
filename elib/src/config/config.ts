import dotenv from 'dotenv'

dotenv.config(
  {path:'./.env'}
);

const _config = {
    port:process.env.PORT,
    mongoUrl:process.env.MONGODB_URI,
    websiteName :"saadEbookStoor",
    showError:process.env.NODE_ENV
}

export const config = Object.freeze(_config);