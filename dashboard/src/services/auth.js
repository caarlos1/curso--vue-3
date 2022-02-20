export default (httpClient) => ({
  login: async ({ email, password }) =>
    httpClient.post('/auth/login', {
      email,
      password
    }),

  register: async ({ name, email, password }) =>
    httpClient.post('/auth/register', {
      name,
      email,
      password
    })
})
