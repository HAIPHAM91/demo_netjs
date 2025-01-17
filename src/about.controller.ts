import { Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('about')
export class AboutController {
  constructor(private jwtService: JwtService){}
  @Get()
  index() {
    return 'hello About';
  }

  @Post('/login')
  async login(){
    const payload = {username: 'HAI PHAM', email: 'haipham@gmail.com'};
    const token = await this.jwtService.signAsync(payload, {secret: 'haipham',});
    return{message: 'Login thannh cong', accessToken: token};
  }
}
