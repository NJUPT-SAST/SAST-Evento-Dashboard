/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  basePath: "/console",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sast-evento-1309205610.cos.ap-shanghai.myqcloud.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
