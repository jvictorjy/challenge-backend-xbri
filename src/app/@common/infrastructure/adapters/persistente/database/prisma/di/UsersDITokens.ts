export class UsersDITokens {
  //use cases
  public static readonly CreateUsersUseCase: unique symbol =
    Symbol('CreateUsersUseCase');

  // Repositories
  public static readonly UserRepository: unique symbol =
    Symbol('UserRepository');
}
