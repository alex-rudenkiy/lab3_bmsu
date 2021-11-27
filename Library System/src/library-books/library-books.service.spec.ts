import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksService } from './library-books.service';

describe('LibraryBooksService', () => {
  let service: LibraryBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryBooksService],
    }).compile();

    service = module.get<LibraryBooksService>(LibraryBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
