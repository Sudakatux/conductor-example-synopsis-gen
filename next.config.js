/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  publicRuntimeConfig: {
    conductor: {
      keyId: process.env.KEY,
      keySecret: process.env.SECRET,
      serverUrl: process.env.SERVER_URL,
    },
    workflow: {
      name: `${process.env.WF_NAME || "TEXT_COMPLETE_MR"}`,
      correlationId: "aCorrelationId",
    },
  },
  reactStrictMode: false,
  output: "standalone",
};
