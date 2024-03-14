
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

@Controller('google-auth')
export class GoogleAuthController {
    constructor(private readonly googleAuthService: GoogleAuthService){}
 
    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        
    }

    @Get('callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        res.redirect('http://localhost:3000/dashboard');
    }

    @Get()
    @UseGuards(AuthGuard('facebook'))
    async getProfile() {
    }
}

