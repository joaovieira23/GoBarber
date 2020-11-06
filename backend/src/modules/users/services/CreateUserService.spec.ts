import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserServices from './CreateUserServices';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserServices(
      fakeUsersRepository
    );

    const user = await createUser.execute({
      name: 'João Vieira',
      email: 'joaovictorvieira.04@hotmail.com',
      password: '1231231',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserServices(
      fakeUsersRepository
    );

    await createUser.execute({
      name: 'João Vieira',
      email: 'joaovictorvieira.04@hotmail.com',
      password: '1231231',
    });

    expect(
      createUser.execute({
        name: 'João Vieira',
        email: 'joaovictorvieira.04@hotmail.com',
        password: '1231231',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
