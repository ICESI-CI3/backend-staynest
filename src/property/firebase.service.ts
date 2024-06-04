// src/property/firebase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private bucket;

  onModuleInit() {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    if (!serviceAccountPath) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is not defined');
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    this.bucket = admin.storage().bucket();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    const fileUpload = this.bucket.file(uniqueFilename);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        await fileUpload.makePublic();
        resolve(fileUpload.publicUrl());
      });

      stream.end(file.buffer);
    });
  }
}
