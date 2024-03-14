import { Inject, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtStartegy } from './jwt.strategy';


@Module({
  imports :[

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRETE'),
        expiresIn: config.get<string | Number>('JWT_EXPIRES'), 
      }),
    }),

    MongooseModule.forFeature([{name : 'User' , schema : UserSchema}])

  ],
  controllers: [UserController],
  providers: [UserService , JwtStartegy ],
  
  
})
export class UserModule {}






