import { CloudFrontClient, CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

/* eslint-disable */
const accessKeyId = process.env.ACCESS_KEY_ID;
const distributionId = process.env.DISTRIBUTION_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
/* eslint-enable */

const client = new CloudFrontClient({
  region: "eu-west-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const params = {
  DistributionId: distributionId,
  InvalidationBatch: {
    CallerReference: String(new Date().getTime()),
    Paths: {
      Quantity: 1,
      Items: ["/*"],
    },
  },
};

const createInvalidationCommand = new CreateInvalidationCommand(params);

const response = await client.send(createInvalidationCommand);

console.log("Posted cloudfront invalidation, response is:");
console.log(response);
