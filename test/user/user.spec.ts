import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/modules/user/user.service';
import { Repository } from 'typeorm';
import { User } from '../../src/modules/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserTests', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };
    const findOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(user);
    const result = await userService.findbyUserName(email);
    expect(result).toBe(user);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { email } });
  });

  it('should return undefined if user is not found', async () => {
    const email = 'test@example.com';
    const findOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(undefined);
    const result = await userService.findbyUserName(email);
    expect(result).toBeUndefined();
    expect(findOneSpy).toHaveBeenCalledWith({ where: { email } });
  });

  it('should create a new user', async () => {
    const userDto = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };
    const encryptedPassword = 'encrypted_password';
    const saveSpy = jest.spyOn(userRepository, 'save').mockResolvedValueOnce({
      email: 'test@example.com',
      id: 1,
      password: encryptedPassword,
    });
    const result = await userService.createUser(userDto);

    expect(result).toEqual({ ...userDto, password: encryptedPassword });
    expect(saveSpy).toHaveBeenCalledWith(expect.any(User));
    expect(saveSpy.mock.calls[0][0].email).toBe(userDto.email);
  });
});
