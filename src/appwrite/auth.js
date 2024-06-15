import confg from "../confg/confg.js";
import { Client, Account, ID } from "appwrite";

export class AuthServise {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(confg.appwriteUrl)
      .setProject(confg.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount(email, password, userName) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email,password){
    try {
       return await this.account.createEmailSession(email,password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUSer(){
    try {
        return await this.account.get();
    } catch (error) {
         console.log("error getting current user"+error.message);
         
    }
        return null;

}
   
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }

    }
}

const authService = new AuthServise();

export default authService;
