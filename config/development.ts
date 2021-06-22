export default {
  NODE_ENV: 'development',
  mongoDb: {
    uri: 'mongodb://mongo/nest',
  },
  linkedIn: {
    baseURL: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: '77vfl2og84troi',
    clientSecret: '6FskDdNx7lUrzET1',
    redirectURL: 'http://localhost:8080/authenticate',
    state: 'state',
    scope: 'r_liteprofile%20r_emailaddress%20w_member_social',
  },
};
