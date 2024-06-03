import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { PropertyType } from '../enums/propertyType.enum';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PropertyService', () => {
  let service: PropertyService;

  let properties = [
    {
      id: 'a1',
      type: PropertyType.House,
      country: 'USA',
      city: 'New York',
      address: '123 Main St',
      latitude: 40.7128,
      altitude: -74.0060,
      rooms: 3,
      bathrooms: 2,
      area: 150,
      cost_per_night: 200,
      max_people: 6,
      description: 'A beautiful house in the heart of New York.',
      slug: 'usa-new-york-123-main-st'
    },
    {
      id: 'a2',
      type: PropertyType.Apartment,
      country: 'Canada',
      city: 'Toronto',
      address: '456 Queen St',
      latitude: 43.6511,
      altitude: -79.3470,
      rooms: 2,
      bathrooms: 1,
      area: 100,
      cost_per_night: 150,
      max_people: 4,
      description: 'A cozy apartment in Toronto.',
      slug: 'canada-toronto-456-queen-st'
    },
    {
      id: 'a3',
      type: PropertyType.Chalet,
      country: 'Spain',
      city: 'Barcelona',
      address: '789 Beach Rd',
      latitude: 41.3851,
      altitude: 2.1734,
      rooms: 4,
      bathrooms: 3,
      area: 200,
      cost_per_night: 300,
      max_people: 8,
      description: 'A luxurious chalet near the beach in Barcelona.',
      slug: 'spain-barcelona-789-beach-rd'
    }
  ];

  let propertyRepositoryMock: Partial<Record<keyof Repository<Property>, jest.Mock>>;

  propertyRepositoryMock = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(properties),
      getOne: jest.fn().mockResolvedValue(properties[0]), // Assume it returns the first element for this example
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(undefined),
    })),
    preload: jest.fn(({ id, ...updateDto }) => ({
      id,
      ...updateDto
    })),
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => dto),
    remove: jest.fn((propertyP) => {
      properties = properties.filter(property => property !== propertyP);
      return Promise.resolve(properties);
    }),
    findOne: jest.fn((term) => {
      const byID = properties.find(property => property.id === term);

      if (!byID) {
        const bySlug = properties.find(property => property.slug === term);

        if (bySlug) {
          return bySlug;
        } else {
          return "Not found";
        }
      } else {
        return byID;
      }
    }),
    update: jest.fn((id, updateDto) => ({
      id,
      ...updateDto
    })),
    find: jest.fn(() => properties),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property),
          useValue: propertyRepositoryMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: { /* Mock methods if they're used in the service */ },
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a property', async () => {
    const dto = {
      type: PropertyType.Chalet,
      country: 'Colombia',
      city: 'Buga',
      address: 'Calle 2 sur #15A-69',
      latitude: 30.41,
      altitude: 132.145,
      rooms: 2,
      bathrooms: 1,
      area: 50,
      cost_per_night: 20,
      max_people: 4,
      description: 'A lovely chalet in Buga.',
      slug: 'colombia-buga-calle-2-sur-15a-69'
    };

    const imageBuffer = Buffer.from('some-image-data', 'base64');
    const imageName = 'image-a4.jpg';
    const imageMimeType = 'image/jpeg';

    expect(await service.create(dto, imageBuffer, imageName, imageMimeType)).toEqual({
      id: expect.any(Number),
      ...dto,
      image: 'https://storage.googleapis.com/bucket-name/image-a4.jpg'
    });
  });

  it('should update a property', async () => {
    const editedProperty = {
      id: 'a1',
      type: PropertyType.House,
      country: 'Edited USA',
      city: 'New York',
      address: '123 Main St',
      latitude: 40.7128,
      altitude: -74.0060,
      rooms: 3,
      bathrooms: 2,
      area: 150,
      cost_per_night: 200,
      max_people: 6,
      description: 'An updated beautiful house in New York.',
      slug: 'usa-new-york-123-main-st'
    };

    expect(await service.update('a1', {
      id: 'a1',
      type: PropertyType.House,
      country: 'Edited USA',
      city: 'New York',
      address: '123 Main St',
      latitude: 40.7128,
      altitude: -74.0060,
      rooms: 3,
      bathrooms: 2,
      area: 150,
      cost_per_night: 200,
      max_people: 6,
      description: 'An updated beautiful house in New York.',
      slug: 'usa-new-york-123-main-st'
    })).toEqual(editedProperty);
  });

  it('should get a property by ID', async () => {
    expect(await service.findOne('a3')).toEqual({
      id: 'a3',
      type: PropertyType.Chalet,
      country: 'Spain',
      city: 'Barcelona',
      address: '789 Beach Rd',
      latitude: 41.3851,
      altitude: 2.1734,
      rooms: 4,
      bathrooms: 3,
      area: 200,
      cost_per_night: 300,
      max_people: 8,
      description: 'A luxurious chalet near the beach in Barcelona.',
      slug: 'spain-barcelona-789-beach-rd'
    });
  });

  it('should get a property by slug', async () => {
    expect(await service.findOne('canada-toronto-456-queen-st')).toEqual({
      id: 'a2',
      type: PropertyType.Apartment,
      country: 'Canada',
      city: 'Toronto',
      address: '456 Queen St',
      latitude: 43.6511,
      altitude: -79.3470,
      rooms: 2,
      bathrooms: 1,
      area: 100,
      cost_per_night: 150,
      max_people: 4,
      description: 'A cozy apartment in Toronto.',
      slug: 'canada-toronto-456-queen-st'
    });
  });

  it('should get all properties', async () => {
    expect(await service.findAll()).toEqual(properties);
    expect(propertyRepositoryMock.find).toHaveBeenCalledWith();
  });

  it('should delete a property', async () => {
    const propertiesAfterRemove = [
      {
        id: 'a2',
        type: PropertyType.Apartment,
        country: 'Canada',
        city: 'Toronto',
        address: '456 Queen St',
        latitude: 43.6511,
        altitude: -79.3470,
        rooms: 2,
        bathrooms: 1,
        area: 100,
        cost_per_night: 150,
        max_people: 4,
        description: 'A cozy apartment in Toronto.',
        slug: 'canada-toronto-456-queen-st'
      },
      {
        id: 'a3',
        type: PropertyType.Chalet,
        country: 'Spain',
        city: 'Barcelona',
        address: '789 Beach Rd',
        latitude: 41.3851,
        altitude: 2.1734,
        rooms: 4,
        bathrooms: 3,
        area: 200,
        cost_per_night: 300,
        max_people: 8,
        description: 'A luxurious chalet near the beach in Barcelona.',
        slug: 'spain-barcelona-789-beach-rd'
      }
    ];
  
    const propertyToRemove = properties[0];
  
    expect(await service.remove(propertyToRemove.id)).toEqual(propertiesAfterRemove);
    expect(propertyRepositoryMock.remove).toHaveBeenCalledWith(propertyToRemove);
  });
});
