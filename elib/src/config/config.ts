import dotenv from 'dotenv'

dotenv.config(
  {path:'./.env'}
);

const _config = {
    port:process.env.PORT,
    mongoUrl:process.env.MONGODB_URI,
    websiteName :"saadEbookStoor",
    showError:process.env.NODE_ENV,
    screte_key:process.env.SECRETE_ACCESS_TOKEN,
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
}

export const config = Object.freeze(_config);