/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  basePath: "/console",
  webpack: (config, { isServer }) => {
    // Adjust the Webpack target
    if (isServer) {
      config.target = "node";

      // Exclude canvas from server-side bundling
      config.externals.push("canvas");
    }

    // Preserve __dirname
    config.node = {
      __dirname: false,
    };

    // Add a rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    return config;
  },
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
