import confg from "../confg/confg.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(confg.appwriteUrl)
      .setProject(confg.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(title, slug, content, featuredImg, status, userid) {
    try {
      return await this.databases.createDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userid,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateDocument(title, slug, content, featuredImg, status, userid) {
    try {
      return await this.databases.updateDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userid,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost() {
    try {
      await this.databases.deleteDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error" + error);

      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(query = [Query.equal("status ", "active")]) {
    try {
      return await this.databases.listDocuments(
        confg.appwriteDatabaseId,
        confg.appwriteCollectionId,
        query
      );
    } catch (error) {
      throw error;
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        confg.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(confg.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("error" + error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(confg.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
