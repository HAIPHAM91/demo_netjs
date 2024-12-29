import { Controller, Get } from '@nestjs/common';

@Controller('about')
export class AboutController {
  @Get()
  index() {
    return 'hello About';
  }
}
