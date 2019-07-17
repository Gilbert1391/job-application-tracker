import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/activate/:key')
  @HttpCode(204)
  activateAccount(@Param('key') key: string): Promise<void> {
    return this.accountService.activateAccount(key);
  }

  @Post('/activation-key/:key')
  @HttpCode(204)
  sendActivationKey(@Param('key') key: string): Promise<void> {
    return this.accountService.sendActivationKey(key);
  }

  @Post('/activation-link/:username')
  @HttpCode(204)
  sendActivationLink(@Param('username') username: string): Promise<void> {
    return this.accountService.sendActivationLink(username);
  }
}
