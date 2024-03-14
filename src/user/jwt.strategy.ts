import { UserService } from './user.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
         private  readonly userModel: mongoose.Model<User>){
 
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRETE,

        });

    }

    async validate(payload){
        const {id} = payload;

        const user = await this.userModel.findById(id);
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}