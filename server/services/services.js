import AWS from 'aws-sdk';
import fs from 'fs';


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});


const uploadFileToS3 = async (file, folderName) => {
  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folderName}/${file.name}`,
      Body: fs.createReadStream(file.tempFilePath),
      ContentType: file.mimetype
    };

    const uploadedImage = await s3.upload(uploadParams).promise();
    return uploadedImage.Location; 
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export { uploadFileToS3 };