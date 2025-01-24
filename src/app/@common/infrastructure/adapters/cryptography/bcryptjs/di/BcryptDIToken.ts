export class BcryptDIToken {
  public static readonly HashComparer: unique symbol = Symbol('HashComparer');
  public static readonly HashGenerator: unique symbol = Symbol('HashGenerator');
}
