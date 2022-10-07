import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }
}
