import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.entity';
import { NewStarshipInput } from './dto/new.starship.input';

describe('StarshipsResolver', () => {
  let resolver: StarshipsResolver;
  let service: Partial<Record<keyof StarshipsService, jest.Mock>>;

  const mockStarship: Starship = { id: 1, crew: 5, score: 10, name: 'name' };
  const mockStarships: Starship[] = [
    mockStarship,
    { id: 2, crew: 7, score: 15, name: 'name' },
  ];

  beforeEach(async () => {
    service = {
      findOne: jest.fn().mockResolvedValue(mockStarship),
      findOneRandom: jest.fn().mockResolvedValue(mockStarship),
      findAll: jest.fn().mockResolvedValue(mockStarships),
      findPaginated: jest.fn().mockResolvedValue(mockStarships),
      create: jest.fn().mockResolvedValue(mockStarship),
      createMany: jest.fn().mockResolvedValue(mockStarships),
      updateScore: jest.fn().mockResolvedValue(mockStarship),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsResolver,
        { provide: StarshipsService, useValue: service },
      ],
    }).compile();

    resolver = module.get<StarshipsResolver>(StarshipsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('starship', () => {
    it('should return one starship by id', async () => {
      expect(await resolver.starship(1)).toEqual(mockStarship);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('getRandomStarship', () => {
    it('should return a random starship', async () => {
      expect(await resolver.getRandomStarship()).toEqual(mockStarship);
      expect(service.findOneRandom).toHaveBeenCalled();
    });
  });

  describe('getAllStarships', () => {
    it('should return all starships', async () => {
      expect(await resolver.getAllStarships()).toEqual(mockStarships);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getPaginatedStarships', () => {
    it('should return paginated starships with custom page and size', async () => {
      const page = 2;
      const size = 7;
      expect(await resolver.getPaginatedStarships(page, size)).toEqual(
        mockStarships
      );
      expect(service.findPaginated).toHaveBeenCalledWith({ page, size });
    });
  });

  describe('createStarship', () => {
    it('should create and return one starship', async () => {
      const input: NewStarshipInput = { crew: 10, name: 'name' };
      expect(await resolver.createStarship(input)).toEqual(mockStarship);
      expect(service.create).toHaveBeenCalledWith(input);
    });
  });

  describe('createManyStarships', () => {
    it('should create and return many starships', async () => {
      const inputs: NewStarshipInput[] = [
        { crew: 10, name: 'name' },
        { crew: 15, name: 'name' },
      ];
      expect(await resolver.createManyStarships(inputs)).toEqual(mockStarships);
      expect(service.createMany).toHaveBeenCalledWith(inputs);
    });
  });

  describe('updateScore', () => {
    it('should update score and return updated starship', async () => {
      expect(await resolver.updateScore(1)).toEqual(mockStarship);
      expect(service.updateScore).toHaveBeenCalledWith(1);
    });
  });
});
