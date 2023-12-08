/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["sast-evento-1309205610.cos.ap-shanghai.myqcloud.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sast-evento-1309205610.cos.ap-shanghai.myqcloud.com",
        port: "",
        pathname: "/test/**",
      },
    ],
  },
};
