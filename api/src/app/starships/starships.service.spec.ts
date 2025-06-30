import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { Repository } from 'typeorm';
import { Starship } from './starship.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockStarship = { id: 1, crew: 50, score: 0, name: 'name' };

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  increment: jest.fn(),
};

describe('StarshipsService', () => {
  let service: StarshipsService;
  let repo: jest.Mocked<Repository<Starship>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: getRepositoryToken(Starship),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    repo = module.get(getRepositoryToken(Starship));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all starships', async () => {
    repo.find.mockResolvedValue([mockStarship]);
    const result = await service.findAll();
    expect(result).toEqual([mockStarship]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should return paginated starships', async () => {
    repo.find.mockResolvedValue([mockStarship]);
    const result = await service.findPaginated({ page: 1, size: 10 });
    expect(result).toEqual([mockStarship]);
    expect(repo.find).toHaveBeenCalledWith({
      skip: 10,
      take: 10,
      order: { id: 'ASC' },
    });
  });

  it('should find one starship by id', async () => {
    repo.findOneBy.mockResolvedValue(mockStarship);
    const result = await service.findOne(1);
    expect(result).toEqual(mockStarship);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create one starship', async () => {
    repo.create.mockReturnValue(mockStarship);
    repo.save.mockResolvedValue(mockStarship);

    const result = await service.create({ crew: 50 } as any);
    expect(result).toEqual(mockStarship);
    expect(repo.create).toHaveBeenCalledWith({ crew: 50 });
    expect(repo.save).toHaveBeenCalledWith(mockStarship);
  });

  it('should increment score and return updated starship', async () => {
    repo.increment.mockResolvedValue(undefined);
    repo.findOneBy.mockResolvedValue(mockStarship);

    const result = await service.updateScore(1);
    expect(result).toEqual(mockStarship);
    expect(repo.increment).toHaveBeenCalledWith({ id: 1 }, 'score', 1);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
});
