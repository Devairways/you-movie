export interface Video {
  userId: string;
  screenShot: Express.Multer.File;
  video: Express.Multer.File;
}
