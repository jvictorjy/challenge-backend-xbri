export class TireDITokens {
  //use cases
  public static readonly CreateTireUseCases: unique symbol =
    Symbol('CreateTireUseCases');
  public static readonly DeleteTireUseCases: unique symbol =
    Symbol('DeleteTireUseCases');

  // Repositories
  public static readonly TireRepository: unique symbol =
    Symbol('TireRepository');
}
