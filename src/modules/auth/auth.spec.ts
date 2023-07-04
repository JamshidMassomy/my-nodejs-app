import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
  let service: AuthService;
  // let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // repository = module.get<YourRepository>(YourRepository);
  });

  it('should return user information if request.user exists', async () => {
    const request = { user: { id: 1, email: 'test@example.com' } };

    const result = await service.me(request);

    expect(result).toEqual({ id: 1, email: 'test@example.com' });
  });

  it('should throw UnauthorizedException if request.user is undefined', async () => {
    const request = { user: undefined };

    await expect(service.me(request)).rejects.toThrow(UnauthorizedException);
  });
});
