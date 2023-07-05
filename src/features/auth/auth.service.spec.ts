import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, VerificationQuestion } from '../../core/enums';

const userServiceMock = {
  findUser: jest.fn(),
  resetPassword: jest.fn().mockImplementation(),
}

const jwtServiceMock = {
  signAsync: jest.fn(),
}

const mockUser = { 
  userName: 'user',
  password: 'pass',
  name: 'name',
  roles: [Role.ADMIN],
  question: VerificationQuestion.PET,
  answer: 'Pet',
};

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService ,useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in succesfully', async () => {
      jest.spyOn(userServiceMock, 'findUser').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      jest.spyOn(jwtServiceMock, 'signAsync').mockResolvedValueOnce('YourToken');

      const token = await service.signIn('user', 'pass');

      expect(token.accessToken).toEqual('YourToken');
    });

    it('should fail signing in due to wrong password', async () => {
      try {
        jest.spyOn(userServiceMock, 'findUser').mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
        jest.spyOn(jwtServiceMock, 'signAsync').mockResolvedValueOnce('YourToken');
  
        await service.signIn('user', 'pass');
      } catch(err) {
        expect(err.message).toBe('Unauthorized');
      }

      expect(service.signIn('user', 'pass')).rejects.toThrowError();
    });

    it('should fail signing in due to wrong username', async () => {
      try {
        jest.spyOn(userServiceMock, 'findUser').mockResolvedValue(null);
        (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
        jest.spyOn(jwtServiceMock, 'signAsync').mockResolvedValueOnce('YourToken');
  
        await service.signIn('user', 'pass');
      } catch(err) {
        expect(err.message).toBe('Username does not exist');
      }

      expect(service.signIn('user', 'pass')).rejects.toThrowError();
    });
  });

  describe('forgotMyPassword', () => {
    const dataMock = {
      user: {
        name: 'name',
        username: 'user',
        email: 'email',
        newPassword: 'newPass',
      },
      verification: {
        question: VerificationQuestion.PET,
        answer: 'Pet',
      }
    };

    it('should successfully reset password', async () => {
      jest.spyOn(userServiceMock, 'findUser').mockResolvedValueOnce(mockUser);
      
      await service.forgotMyPassword(dataMock.user, dataMock.verification);

    });
  });
});
