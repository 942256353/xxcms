import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
    //文件删除
    delete(url: string) {
      try {
        fs.unlinkSync(url);
        return {
            code: 200,
            message: '删除成功'
        }
      } catch (error) {
        return {
            code: 500,
            message: '删除失败',
            error
        }
      }
    }
}
