const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}

export default config;