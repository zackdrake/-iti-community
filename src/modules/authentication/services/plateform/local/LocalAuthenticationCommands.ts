import { Injectable } from '@angular/core';
import { sign } from 'jsonwebtoken';
import { Bad, Ok } from 'src/modules/common/Result';
import { UserLocalStorage } from 'src/modules/user/services/platform/local/user.storage';
import { AuthenticationCommands, LoginCommandResult, LogoutCommandResult } from '../../authentication.commands';

@Injectable()
export class LocalAuthenticationCommands extends AuthenticationCommands {
  private userStorage: UserLocalStorage = new UserLocalStorage();

  async login(username: string, password: string): Promise<LoginCommandResult> {
    console.log('Local login...');
    const tokenLifetime = 1000 * 60 * 60 * 24 * 7;
    const users = this.userStorage.getValue();
    const userId = Object.keys(users).find(id => users[id].username === username);
    if (!userId) {
      return Bad("invalid_credentials");
    }

    const user = users[userId];
    if (user.password !== password) {
      return Bad("invalid_credentials");
    }

    const userInfo = {
      id: user.id,
      username: user.username
    };
    const token = sign(userInfo, '6zKOFPXCJVT2rSIBIGczyN4noGZoTtkR', {
        expiresIn: tokenLifetime
    });

    return Ok({
      user,
      bearer: {
        token: token,
        expiresAt: Date.now() + tokenLifetime * 1000
      }
    });
  }

  async logout(userId: string): Promise<LogoutCommandResult> {
    return Ok();
  }
}
