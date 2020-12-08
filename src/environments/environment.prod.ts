const url1: string = "https://woo-shopz.cloudns.cl/wp-json/wc/v3";
const authUrl1: string ="https://woo-shopz.cloudns.cl/wp-json/jwt-auth/v1/token";
const tokenVerifyUrl1: string ="https://woo-shopz.cloudns.cl/wp-json/jwt-auth/v1/token/validate";

export const environment = {
  production: true,
  backend_api_url: url1,
  auth_url: authUrl1,
  token_verify_url: tokenVerifyUrl1,
  readOnlyKeys: {
    consumer_key: 'ck_994ee484ab3dd8d7a8c95a8c4efc18bc53ac711f',
    consumer_secret: 'cs_c62bfd25d0dd8eb375b2ef28918c10684acb3a8e'
  },
  writableKeys: {
    consumer_key: 'ck_eaa7d241da7b9ed870a3b495ba12a069a00a78b3',
    consumer_secret: 'cs_12bae45e6d1a45bda8a6c9eb5edbc5931dc9a318'
  }
};
