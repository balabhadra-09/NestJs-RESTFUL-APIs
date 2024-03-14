import { updateDto } from './dto/update.dto';
import { loginDto } from './dto/login.dto';

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { User } from './schemas/user.schema';
import mongoose, { trusted } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { signUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpDto):Promise<User>{
        try {
            
            const {name , email , password} = signUpDto;
            const data = await this.userModel.findOne({email}).exec();
            if(data){
                throw new NotFoundException({message:"User already exits"})
            }
            
            const user = this.userModel.create({
                name,
                email,
                password,
            });
            await (await user).save();
            return user

        } catch (error) {
            throw new BadRequestException({ message: "Internal server error" });
        }
    }




    async login(loginDto): Promise<{ token: string }> {
        try {
            const { email, password } = loginDto;
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) {
                throw new NotFoundException({ message: "User not found" });
            }
            const token = await this.jwtService.sign({ id: user._id });
            return { token };
        } catch (error) {
            console.error(error);
            throw new BadRequestException("Failed to login");
        }
    }




    async findAlluser() {
        try {
            const user = await this.userModel.find().exec();
            if(!user){
                throw new NotFoundException();
            }
            return user;

        } catch (error) {
            throw new BadRequestException({ message: "Internal server error" });
        }
    }

    async findById(id:string){
        try {
              const user = await this.userModel.findById(id).exec();
              if(!user){
                throw new NotFoundException()
              }
              return user;
            
        } catch (error) {
             console.log(error)
            throw new BadRequestException({ message: "Internal server error" });
        }
    }


    async updateOne(id : String ,updateDto:updateDto){
        try {
              const user = await this.userModel.findByIdAndUpdate(id,updateDto ).exec()
              if(!user){
                throw new BadRequestException({message:"user not found"})
              }
              return user
        } catch (error) {
            console.log(error)
            throw new BadRequestException({ message: "Internal server error" });
        }
    }

    async deleteOne(id:String){
        try {
            const deleteUser = await this.userModel.findOneAndDelete(id );
            if(!deleteUser){
                throw new UnauthorizedException({message : "user not found"});
            }
            return deleteUser;
            
        } catch (error) {
            console.log(error)
            throw new BadRequestException({ message: "Internal server error" });
        }
    }
} 

