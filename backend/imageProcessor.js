// imageProcessor.js
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function processImage(file) {
  // Create a unique filename
  const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Ensure the upload directory exists
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  // Save the uploaded file
  await fs.writeFile(filePath, file.buffer);

  // Read the file and encode it to base64
  const base64Image = await fs.readFile(filePath, { encoding: 'base64' });

  // Delete the temporary file
  await fs.unlink(filePath);

  // Return the image data in the format expected by Claude API
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: file.mimetype,
      data: base64Image
    }
  };
}