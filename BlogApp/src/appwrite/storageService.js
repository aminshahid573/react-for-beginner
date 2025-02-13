import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [],
        (progress) => {
          console.log(`Upload Progress: ${progress.progress}%`);
          // Update your state or UI component here with progress.progress
        }
      );
    } catch (error) {
      console.log("APPWRITE SERVICE :: uploadFile :: ERROR ", error);
      throw error;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("APPWRITE SERVICE :: getFilePreview :: ERROR ", error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;
