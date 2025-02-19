import { UpdateTireUseCases } from '@app/tire/use-cases/update-tire.use-cases';
import { TireRepository } from '@app/tire/repositories';
import { UserRepository } from '@app/users/repositories';
import { Tire, Users } from '@prisma/client';
import { UserType } from '@app/users/enum';

describe('UpdateTireUseCases', () => {
  let useCase: UpdateTireUseCases;
  let tireRepository: TireRepository;
  let sellerRepository: UserRepository;

  beforeEach(() => {
    tireRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
    } as unknown as TireRepository;

    sellerRepository = {
      findSeller: jest.fn(),
    } as unknown as UserRepository;

    useCase = new UpdateTireUseCases(tireRepository, sellerRepository);
  });

  it('should update a tire successfully', async () => {
    const id = 'valid_uuid';
    const payload = {
      name: 'Updated Tire',
      price: 200,
      stock: 15,
      seller_id: 'valid_seller_id',
    };

    const tire: Tire = {
      id: 'uuid',
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity_available: 10,
      size: '225/220R17',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    const user: Users = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(sellerRepository, 'findSeller').mockResolvedValue(user);
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(tire);
    jest.spyOn(tireRepository, 'update').mockResolvedValue(undefined);

    await expect(useCase.execute(id, payload)).resolves.toBeUndefined();
    expect(sellerRepository.findSeller).toHaveBeenCalledWith(payload.seller_id);
    expect(tireRepository.findOne).toHaveBeenCalledWith(id);
    expect(tireRepository.update).toHaveBeenCalledWith(id, payload);
  });

  it('should throw an error if seller is not found', async () => {
    const id = 'valid_uuid';
    const payload = {
      name: 'Updated Tire',
      price: 200,
      stock: 15,
      seller_id: 'invalid_seller_id',
    };
    jest.spyOn(sellerRepository, 'findSeller').mockResolvedValue(null);

    await expect(useCase.execute(id, payload)).rejects.toThrowError(
      'Seller not found',
    );
    expect(sellerRepository.findSeller).toHaveBeenCalledWith(payload.seller_id);
    expect(tireRepository.findOne).not.toHaveBeenCalled();
    expect(tireRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if tire is not found', async () => {
    const id = 'invalid_uuid';
    const payload = {
      name: 'Updated Tire',
      price: 200,
      stock: 15,
      seller_id: 'valid_seller_id',
    };

    const user: Users = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(sellerRepository, 'findSeller').mockResolvedValue(user);
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(id, payload)).rejects.toThrowError(
      'Tire not found',
    );
    expect(sellerRepository.findSeller).toHaveBeenCalledWith(payload.seller_id);
    expect(tireRepository.findOne).toHaveBeenCalledWith(id);
    expect(tireRepository.update).not.toHaveBeenCalled();
  });

  it('should throw an error if repository throws an error', async () => {
    const id = 'valid_uuid';
    const payload = {
      name: 'Updated Tire',
      price: 200,
      stock: 15,
      seller_id: 'valid_seller_id',
    };
    const error = new Error('Repository error');
    jest.spyOn(sellerRepository, 'findSeller').mockRejectedValue(error);

    await expect(useCase.execute(id, payload)).rejects.toThrowError(
      'Repository error',
    );
    expect(sellerRepository.findSeller).toHaveBeenCalledWith(payload.seller_id);
    expect(tireRepository.findOne).not.toHaveBeenCalled();
    expect(tireRepository.update).not.toHaveBeenCalled();
  });
});
