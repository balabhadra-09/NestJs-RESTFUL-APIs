import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleAuthService {
  constructor() {}

  async validateOAuthLogin(profile: Profile, done: VerifyCallback) {
    try {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}


