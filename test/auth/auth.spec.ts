/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../../src/modules/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../src/modules/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { UNAUTHORIZED_ERROR } from 'src/common/constants/error.constant';
import { CustomeException } from 'src/common/exceptions/custom.exception';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should return user information if request.user exists', async () => {
    const request = { user: { id: 1, email: 'test@example.com' } };
    const result = await service.me(request);
    expect(result).toEqual({ id: 1, email: 'test@example.com' });
  });

  it('should throw UnauthorizedException if request.user is undefined', async () => {
    const request = { user: undefined };
    await expect(service.me(request)).rejects.toThrow(
      new CustomeException(UNAUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED as any),
    );
  });
});
