import { Router, Request, Response, Errback, ErrorRequestHandler } from 'express';
import { Repo } from "../models/Repo"
import { AppError } from '../models/AppError';

import * as fs from 'fs/promises';
import path from 'path'

import https from 'https'
import { IncomingMessage } from 'http';

export const repos = Router();

function isError(error: any): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

async function getDataFromFile(filePath: string): Promise<Repo[] | AppError> {
  try {
    const dataBuffer = await fs.readFile(path.join(__dirname, filePath), 'utf8')
    const data: Repo[] = JSON.parse(dataBuffer)

    return data

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to read file"
    throw new AppError(message, 500)
  }
}

repos.get('/', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    let fileData = await getDataFromFile("../../data/repos.json")

    res.status(200)
    res.json(fileData)
  } catch (err) {
    console.log(err)
    res.status(400)
    res.json(err)
  }
});
