import {
  Router,
  Request,
  Response,
  Errback,
  ErrorRequestHandler,
} from 'express';
import { Repo } from '../models/Repo';
import { AppError } from '../models/AppError';

import * as fs from 'fs/promises';
import path from 'path';

import https from 'https';
import { IncomingMessage } from 'http';

export const repos = Router();

function isError(error: any): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

async function getDataFromFile(filePath: string): Promise<Repo[]> {
  try {
    const dataBuffer = await fs.readFile(
      path.join(__dirname, filePath),
      'utf8'
    );
    const data: Repo[] = JSON.parse(dataBuffer);

    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to read file';
    throw new AppError(message, 500);
  }
}

async function getDataFromHTTPS(host: string, path: string): Promise<Repo[]> {
  try {
    var options = {
      host: host,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'request',
      },
    };

    let data: Repo[] = await new Promise((resolve, reject) => {
      https
        .request(options, function (response: IncomingMessage) {
          let body = '';

          response.on('data', (chunk) => {
            body += chunk;
          });

          response.on('end', () => {
            if (response.statusCode === 200) {
              try {
                resolve(JSON.parse(body));
              } catch (err) {
                reject(err);
              }
            } else {
              reject({
                message: response.statusMessage,
                status: response.statusCode,
              });
            }
          });
        })
        .on('error', (err: Error) => {
          reject(err);
        })
        .end();
    });

    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to get file';
    throw new AppError(message, 500);
  }
}

function filtereArray(repos: Repo[]): Repo[] {
  return repos.filter((repo: Repo) => {
    return repo.fork === false;
  });
}

repos.get('/', async (req: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  try {
    const fileData = getDataFromFile('../../data/repos.json');
    const HTTPSData = getDataFromHTTPS(
      'api.github.com',
      '/users/silverorange/repos'
    );
    const allData = await Promise.all([fileData, HTTPSData]);

    const combinedData = allData[0].concat(allData[1]);
    const formatedData = filtereArray(combinedData);

    res.status(200);
    res.json(formatedData);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
});
