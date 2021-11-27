import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBooksController } from './library-books.controller';
import { LibraryBooksService } from './library-books.service';

describe('LibraryBooksController', () => {
  let controller: LibraryBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryBooksController],
      providers: [LibraryBooksService],
    }).compile();

    controller = module.get<LibraryBooksController>(LibraryBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
