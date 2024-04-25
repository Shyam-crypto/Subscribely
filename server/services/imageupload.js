import AWS from 'aws-sdk';
import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});


const uploadFileToS3 = async (file, folderName) => {
  try {
      if (!file) {
          throw new Error('File is undefined or null');
      }

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folderName}/${file.name}`,
      Body: file.buffer, 
      ContentType: file.mimetype
    };

    const uploadedImage = await s3.upload(uploadParams).promise();
    return uploadedImage.Location; 
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export { upload ,uploadFileToS3 };