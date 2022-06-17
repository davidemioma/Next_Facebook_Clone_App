/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "z-p3-scontent.flos2-1.fna.fbcdn.net",
      "firebasestorage.googleapis.com",
      "scontent.flos8-1.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
