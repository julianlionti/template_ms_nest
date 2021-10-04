import { createResponse, ServiceError, tokenMessage } from '@app/common';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Token } from '../schemas/token.schema';
import { SuccessToken, TokenService } from '../services/token.service';

const { generateToken, decodeToken, cleanToken } = tokenMessage();

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern(decodeToken)
  async decodeToken(data: { token: string }) {
    const tokenData = await this.tokenService.decode(data.token);
    if (!tokenData)
      return ServiceError(cleanToken, {
        code: 300,
        error: 'No se pasó ningun token',
      });

    return createResponse<Token>({
      data: { token: tokenData, userId: tokenData },
      name: 'decoded',
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
    });
  }

  @MessagePattern(generateToken)
  async generateToken(userId: string) {
    return createResponse<SuccessToken>({
      data: await this.tokenService.create(userId),
      name: generateToken,
    });
  }

  @MessagePattern(cleanToken)
  async cleanToken(userId: string) {
    await this.tokenService.clean(userId);
    return createResponse({ name: cleanToken });
  }
}
