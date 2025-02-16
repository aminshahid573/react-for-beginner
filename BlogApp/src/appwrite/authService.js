/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
import databaseService from "./databaseService";

export class AuthService {
  client = new Client();
  account;
  // users;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    // this.users = new Users(this.client);
  }

  //create account method using email,password,name and photoUrl
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //call another method
        
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("APPWRITE:: createAccount :: ERROR", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return await this.account.get();
    } catch (error) {
      console.error("APPWRITE:: login :: ERROR", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("APPWRITE :: SERVICE :: logout :: ERROR", error);
      return false;
    }
  }

  async updatePassword({ currentPassword, newPassword }) {
    try {
      const result = await this.account.updatePassword(
        newPassword,
        currentPassword
    );
    return result
    } catch (error) {
      console.log("APPWRITE :: SERVICE :: updatePassword :: ERROR", error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("APPWRITE SERVICE :: getCurrentUser :: ERROR", error);
      return null;
    }
    
  }

 
}

const authService = new AuthService();
export default authService;
