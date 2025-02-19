import { ListTireUseCase } from '@app/tire/use-cases/list-tire.use-cases';
import { TireRepository } from '@app/tire/repositories';

describe('ListTireUseCase', () => {
  let useCase: ListTireUseCase;
  let tireRepository: TireRepository;

  beforeEach(() => {
    tireRepository = {
      findAll: jest.fn(),
    } as unknown as TireRepository;
    useCase = new ListTireUseCase(tireRepository);
  });

  it('should list all tires successfully', async () => {
    const tires = [
      { id: '1', name: 'Tire 1', price: 100, stock: 10 },
      { id: '2', name: 'Tire 2', price: 150, stock: 5 },
    ];
    jest.spyOn(tireRepository, 'findAll').mockResolvedValue(tires);

    const result = await useCase.execute();

    expect(result).toEqual(tires);
    expect(tireRepository.findAll).toHaveBeenCalled();
  });

  it('should return an empty array if no tires are found', async () => {
    jest.spyOn(tireRepository, 'findAll').mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(tireRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an error if repository throws an error', async () => {
    const error = new Error('Repository error');
    jest.spyOn(tireRepository, 'findAll').mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrowError(
      'Status code not found',
    );
    expect(tireRepository.findAll).toHaveBeenCalled();
  });
});
