module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Auth',
        permanent: true,
      },
    ]
  },
}