import { Controller, Post, UploadedFile } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Uploader } from './upload.decorator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('image')
  @Uploader('image')
  @Auth()
  image(@UploadedFile() file: Express.Multer.File) {
    return file
  }

}
