import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserServices from './AuthenticateUserService';
import CreateUserServices from './CreateUserServices';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'João Andrade',
      email: 'joaovictorvieira.04@hotmail.com',
      password: '12312312'
    });

    const response = await authenticateUser.execute({
      email: 'joaovictorvieira.04@hotmail.com',
      password: '12312312',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
