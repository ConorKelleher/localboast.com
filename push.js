import { PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as fs from "fs";
import mime from "mime";
import Promise from "bluebird";

/* eslint-disable */
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
/* eslint-enable */

const s3Client = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const rootDir = "dist";

function uploadAllFilesInDirectory(directory) {
  fs.readdir(directory, function (err, items) {
    items.forEach((item) => {
      const builtPath = `${directory}/${item}`;
      fs.lstat(builtPath, (err, stats) => {
        if (err) {
          return console.error(err);
        }
        if (stats.isDirectory()) {
          return uploadAllFilesInDirectory(builtPath);
        } else {
          fs.readFile(builtPath, async function (err, data) {
            if (err) {
              console.error(err);
              return;
            }
            // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
            // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
            // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
            // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
            const uploadCommand = new PutObjectCommand({
              Bucket: bucketName,
              Key: builtPath.split(`${rootDir}/`)[1],
              Body: data,
              ACL: "public-read",
              ContentType: mime.getType(builtPath),
            });
            try {
              const response = await s3Client.send(uploadCommand);
              console.log(response);
            } catch (err) {
              console.error(err);
            }
          });
        }
      });
    });
  });
}

async function clearBucket() {
  const listCommand = new ListObjectsV2Command({ Bucket: bucketName });
  let hasMore = true;
  const files = [];

  while (hasMore) {
    const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(listCommand);
    if (Contents) {
      files.push(...Contents);
    }
    hasMore = IsTruncated;
    listCommand.input.ContinuationToken = NextContinuationToken;
  }

  await Promise.each(files, (item) => {
    var deleteParams = { Bucket: bucketName, Key: item.Key };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    return s3Client.send(deleteCommand);
  });
}

async function push(dir) {
  await clearBucket();
  uploadAllFilesInDirectory(dir);
}

push(rootDir);
