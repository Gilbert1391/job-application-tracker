import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/activate/:key')
  @HttpCode(204)
  activateUser(@Param('key') key: string): Promise<void> {
    return this.accountService.activateAccount(key);
  }

  @Patch('/activation-link/:key')
  @HttpCode(204)
  generateActivationLink(@Param('key') key: string): Promise<void> {
    return this.accountService.generateActivationLink(key);
  }
}
