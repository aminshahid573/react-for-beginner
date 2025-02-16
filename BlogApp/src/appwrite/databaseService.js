import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DatabaseService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async addUserDetails({userId,name,email,photoId}){
    try {
      const user = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        "67b03b6b0026e33615dd", //users collection id
        userId,
        {
          userId,
          name,
          email,
          photoId,
        })
      return user
      
    } catch (error) {
     console.log("APPWRITE SERVICE :: addUserDetails :: ERROR ", error);
     throw error 
    }
  }

  //update the changes only else make it same
 async updateUserDetails({userId,name,email,photoId}){
  try {
    const user = await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      "67b03b6b0026e33615dd", //users collection id
      userId,
      {
        userId,
        name,
        email,
        photoId,
      })
    return user
    
  } catch (error) {
   console.log("APPWRITE SERVICE :: updateUserDetails :: ERROR ", error);
   throw error 
  }
 }

  async createBlog({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE SERVICE :: createBlog :: ERROR ", error);
    }
  }

  async deleteBlog(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("APPWRITE SERVICE :: deleteBlog :: ERROR ", error);
    }
  }

  async updateBlog({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE SERVICE :: updateBlog :: ERROR ", error);
    }
  }

  async getBlogs(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("APPWRITE SERVICE :: getBlogs :: ERROR ", error);
    }
  }

  async getBlog(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("APPWRITE SERVICE :: getBlog :: ERROR ", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
