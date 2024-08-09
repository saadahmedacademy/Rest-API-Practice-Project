import dotenv from 'dotenv'

dotenv.config(
  {path:'./.env'}
);

const _config = {
    port:process.env.PORT,
    mongoUrl:process.env.MONGODB_URI,
    websiteName :"saadEbookStoor",
    showError:process.env.NODE_ENV,
    screte_key:process.env.SECRETE_ACCESS_TOKEN
}

export const config = Object.freeze(_config);