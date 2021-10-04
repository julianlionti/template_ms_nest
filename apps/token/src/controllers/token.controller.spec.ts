import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { TokenService } from '../services/token.service';

describe('TokenController', () => {
  let tokenController: TokenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService],
    }).compile();

    tokenController = app.get<TokenController>(TokenController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tokenController.generateToken('asdas')).toBe('Hello World!');
    });
  });
});
