export class OrderDITokens {
  //use cases
  public static readonly CreateOrderUseCases: unique symbol = Symbol(
    'CreateOrderUseCases',
  );

  // Repositories
  public static readonly OrderRepository: unique symbol =
    Symbol('OrderRepository');
}
