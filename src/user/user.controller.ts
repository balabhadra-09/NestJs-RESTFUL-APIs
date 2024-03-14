import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { updateDto } from './dto/update.dto';


@Controller('user')
export class UserController {
    constructor(private userSevice : UserService){}


    @Post("/signUp")
      async signUp(@Body() signUpDto : signUpDto):Promise<User>{
        return this.userSevice.signUp(signUpDto)
    }


    @Post("/login")
      async login (@Body() loginDto : loginDto):Promise<{token:String}>{
        return this.userSevice.login(loginDto)
      
    }

    @Get()
    @UseGuards(AuthGuard())
     async gettAlluser() {
        return this.userSevice.findAlluser()
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getUserById(@Param('id') id: string) {
      return this.userSevice.findById(id)
    }
    

    @Put(":id")
    @UseGuards(AuthGuard())
    async updateUserById(@Param("id") id : String, @Body() updateDto:updateDto){
     return this.userSevice.updateOne( id , updateDto)
    }
    
    @Delete(":id")
    @UseGuards(AuthGuard())
    async deleteUserById(@Param("id") id : String){
      return this.userSevice.deleteOne(id)
    }



   

    
}
