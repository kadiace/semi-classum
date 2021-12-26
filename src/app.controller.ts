import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtRefreshGuard } from './auth/guards/jwt-refresh.guard';
import { Public } from './skip-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);

    const {
      refreshToken,
      ...refreshOption
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('auth/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const {
      accessOption,
      refreshOption,
    } = this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie('Refresh', '', refreshOption);
    res.cookie('Authentication', '', accessOption);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return req.user;
  }
}