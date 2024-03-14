import { GoogleAuthModule } from './google-auth/google-auth.module';
import { Module , Controller} from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtStartegy } from './user/jwt.strategy';




@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath :[".env"]
    }),
MongooseModule.forRoot(process.env.MONGODB_URI),

    BookModule,

    UserModule,

    GoogleAuthModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
