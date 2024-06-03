import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { PropertyType } from '../enums/propertyType.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from '../app.module';

describe('PropertyController', () => {
  let controller: PropertyController;

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
      slug: 'usa-new-york-123-main-st',
      image: 'uploads/image-a1.jpg'
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
      slug: 'canada-toronto-456-queen-st',
      image: 'uploads/image-a2.jpg'
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
      slug: 'spain-barcelona-789-beach-rd',
      image: 'uploads/image-a3.jpg'
    }
  ];

  const mockPropertyService = {
    create: jest.fn((propertyDto, imageBuffer, imageName, imageMimeType) => ({
      id: 'a' + Math.floor(Math.random() * 100),
      ...propertyDto,
      image: 'https://storage.googleapis.com/bucket-name/' + imageName
    })),

    findAll: jest.fn(() => properties),

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

    update: jest.fn((id, updatePropertyDto) => ({
      id: id,
      ...updatePropertyDto,
    })),

    remove: jest.fn((id) => properties.filter(property => property.id !== id))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [PropertyService],
      imports: [AuthModule, AppModule],
    }).overrideProvider(PropertyService)
      .useValue(mockPropertyService)
      .compile();

    controller = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      slug: 'colombia-buga-calle-2-sur-15a-69',
      image:''
    };

    const imageBuffer = Buffer.from('some-image-data', 'base64');
    const imageName = 'image-a4.jpg';
    const imageMimeType = 'image/jpeg';

    expect(await controller.create(dto, imageBuffer, imageName, imageMimeType)).toEqual({
      id: expect.any(String),
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
      slug: 'colombia-buga-calle-2-sur-15a-69',
      image: 'https://storage.googleapis.com/bucket-name/image-a4.jpg'
    });

    expect(mockPropertyService.create).toHaveBeenCalledWith(dto, imageBuffer, imageName, imageMimeType);
    expect(mockPropertyService.create).toHaveBeenCalledTimes(1);
  });

  it('should get a property by ID', () => {
    expect(controller.findOne('a3')).toEqual({
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
      slug: 'spain-barcelona-789-beach-rd',
      image: 'uploads/image-a3.jpg'
    });

    expect(mockPropertyService.findOne).toHaveBeenCalledWith('a3');
    expect(mockPropertyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should get a property by slug', () => {
    expect(controller.findOne('canada-toronto-456-queen-st')).toEqual({
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
      slug: 'canada-toronto-456-queen-st',
      image: 'uploads/image-a2.jpg'
    });

    expect(mockPropertyService.findOne).toHaveBeenCalledWith('canada-toronto-456-queen-st');
    expect(mockPropertyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should get all properties', () => {
    expect(controller.findAll()).toEqual(properties);
    expect(mockPropertyService.findAll).toHaveBeenCalledWith();
  });

  it('should update a property', () => {
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
      slug: 'usa-new-york-123-main-st',
      image: 'uploads/image-a1.jpg'
    };

    expect(controller.update('a1', {
      id:'a1',
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
      slug: 'usa-new-york-123-main-st',
      image: 'uploads/image-a1.jpg'
    })).toEqual(editedProperty);

    expect(mockPropertyService.update).toHaveBeenCalledWith('a1', {
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
      slug: 'usa-new-york-123-main-st',
      image: 'uploads/image-a1.jpg'
    });
    expect(mockPropertyService.update).toHaveBeenCalledTimes(1);
  });

  it('should delete a property', () => {
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
        slug: 'canada-toronto-456-queen-st',
        image: 'uploads/image-a2.jpg'
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
        slug: 'spain-barcelona-789-beach-rd',
        image: 'uploads/image-a3.jpg'
      }
    ];

    expect(controller.remove('a1')).toEqual(propertiesAfterRemove);

    expect(mockPropertyService.remove).toHaveBeenCalledWith('a1');
    expect(mockPropertyService.remove).toHaveBeenCalledTimes(1);
  });
});
