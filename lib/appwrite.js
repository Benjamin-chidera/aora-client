import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.company.aora",
  projectId: "6660763b000b67d22178",
  databaseId: "66607779002bda18e011",
  userCollectionId: "6660779c00241c664cce",
  videosCollectionId: "666077b8002c0e103b24",
  storageId: "66607a3a0015b1c98cc9",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const CreateUser = async ({ email, password, username }) => {
  try {
    const userId = ID.unique();
  

    const newAccount = await account.create(userId, email, password, username);
  

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);


    await SignInUser(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("CreateUser Error:", error);
    throw new Error(error.message);
  }
};

export const SignInUser = async (email, password) => {
  try {
    const session = await account.createSession(email, password);
   
    return session;
  } catch (error) {
    console.error("SignInUser Error:", error);
    throw new Error(error.message);
  }
};
