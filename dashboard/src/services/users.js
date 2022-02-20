export default (httpClient) => ({
  getMe: async () => httpClient.get('/users/me')
})
