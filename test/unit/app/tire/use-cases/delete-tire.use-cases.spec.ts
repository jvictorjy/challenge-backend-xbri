import { DeleteTireUseCase } from '@app/tire/use-cases/delete-tire.use-cases';
import { TireRepository } from '@app/tire/repositories';

describe('DeleteTireUseCase', () => {
  let useCase: DeleteTireUseCase;
  let tireRepository: TireRepository;

  beforeEach(() => {
    tireRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as TireRepository;
    useCase = new DeleteTireUseCase(tireRepository);
  });

  it('should delete a tire successfully', async () => {
    const id = 'valid_uuid';
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue({ id });
    jest.spyOn(tireRepository, 'delete').mockResolvedValue(undefined);

    await expect(useCase.execute(id)).resolves.toBeUndefined();
    expect(tireRepository.findOne).toHaveBeenCalledWith(id);
    expect(tireRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error if tire is not found', async () => {
    const id = 'invalid_uuid';
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(id)).rejects.toThrowError('Tire not found');
    expect(tireRepository.findOne).toHaveBeenCalledWith(id);
    expect(tireRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw an error if repository throws an error', async () => {
    const id = 'valid_uuid';
    const error = new Error('Repository error');
    jest.spyOn(tireRepository, 'findOne').mockRejectedValue(error);

    await expect(useCase.execute(id)).rejects.toThrowError(
      'Status code not found',
    );
    expect(tireRepository.findOne).toHaveBeenCalledWith(id);
    expect(tireRepository.delete).not.toHaveBeenCalled();
  });
});
