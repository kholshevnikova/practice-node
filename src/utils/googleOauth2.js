import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import createHttpError from 'http-errors';

const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');
const OAuthConfigPath = path.resolve('google-oauth.json');

const oAuthConfig = JSON.parse(await readFile(OAuthConfigPath, 'utf-8'));
const redirectUri = oAuthConfig.web.redirect_uris[0];

const googleOauthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

export const validateCode = async (code) => {
  const responce = await googleOauthClient.getToken(code);
  if (!responce.tokens.id_token) {
    throw createHttpError(401);
  }
  const ticket = await googleOauthClient.verifyIdToken({
    idToken: responce.tokens.id_token,
  });
  return ticket;
};

export const generateGoogleOAuthUrl = () => {
  const url = googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  return url;
};
