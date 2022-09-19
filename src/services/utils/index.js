/* eslint-disable quotes */
export const API = {
  url: "https://tef.test/api/",
};

export const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET,
  albumName: process.env.REACT_APP_AWS_ALBUM,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
};
