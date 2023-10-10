import { Controller, Post, UploadedFile,Delete, Body} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Uploader, UploaderFile } from './upload.decorator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('image')
  @Uploader('image')
  @Auth()
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      url: '/' + file.path
    }
  }

  @Post('file')
  @UploaderFile()
  @Auth()
  file(@UploadedFile() file: Express.Multer.File) {
    return {
      url: file.path
    }
  }

  //删除
  @Delete('delete')
  @Auth()
  delete(@Body() dto: Record<any, string>) {
    return this.uploadService.delete(dto.url)
  }
}
