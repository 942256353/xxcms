import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const SiteMiddleware = (req: Request, res: Response, next: () => void)=> {
  if(!req.path.startsWith('/api')){
    const content = readFileSync(resolve(__dirname, '..','..','vue_dist/index.html'))
    // res.setHeader('Content-type','text/html')
    res.send(content.toString())
  }
  next();
}
