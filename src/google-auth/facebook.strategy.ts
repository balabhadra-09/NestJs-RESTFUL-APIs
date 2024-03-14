import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      clientCallbackUrl:process.env.FACEBOOK_CALLBACK_URL,
      authorizationURL: 'https://www.facebook.com/v13.0/dialog/oauth',
    
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      const user = {
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
      };
      
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
