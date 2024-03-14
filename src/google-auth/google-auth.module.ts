import { PassportModule } from '@nestjs/passport';

import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports:[ PassportModule.register({ defaultStrategy: 'facebook' }),
     PassportModule.register({ defaultStrategy: 'google', session: true }),],

  controllers: [GoogleAuthController],
  providers: [GoogleAuthService , GoogleStrategy,FacebookStrategy]
})
export class GoogleAuthModule {}
