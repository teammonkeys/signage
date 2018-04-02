import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import { SPFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";

const validFileTypes = [
  "pdf",
  "doc",
  "docx",
  "gif",
  "jpg",
  "jpeg",
  "png",
  "ppt",
  "pptx"
];

export async function fetchSPFiles() {
  // Initialize the SharePoint fetcher with the values from the SharePoint add-in
  initializeFetcher(
    "https://rowansweng.sharepoint.com",
    "155584b4-5dc2-4283-949d-af5986e39eb3",
    "77IjS/vtrFuYXk2mq0XwA5AeX2Vy7ze0OvnikvWkfb4=",
    "c437039a-84e9-47f2-ac34-b703bb7fcc59"
  );
  return await getAllFiles();
}

/** Return a Promise that contains all SharePoint files. */
export async function getAllFiles() {
  // The first folder to traverse is the root folder, called "Shared Documents"
  const rootFolder = "/Shared Documents";
  // This stack will contain subfolders to be checked for other subfolders
  const stack = [];
  // Create a list of folders that starts with a reference to the root folder
  const folders = [rootFolder];
  // Fetch a list of all folders
  const allFolders = await getAllFolders(rootFolder, stack, folders);
  let files = [];
  const allFiles = [];
  for (let folder of allFolders) {
    // Fetch all files contained in each folder
    files = await sp.web.getFolderByServerRelativeUrl(folder).files.get();
    let fileType;
    for (let file of files) {
      fileType = getFileType(file["Name"]);
      if (validFileTypes.includes(fileType)) {
        allFiles.push({
          name: file["Name"],
          url: file["ServerRelativeUrl"], // The relative URL (path) of the file
          fileType: fileType
        });
      }
    }
  }
  return Promise.all(allFiles);
}

/**
 * Recursively find and return every folder on the SharePoint server
 * as an array of strings. Operates asynchronously.
 * @param folder The current folder to be checked for subfolders
 * @param stack The stack of remaining folders to check
 * @param folders The list of all folder and subfolder paths
 * @return A Promise containing the list of all SharePoint folder paths
 */
export async function getAllFolders(folder, stack, folders) {
  // Fetch the JSON data from SharePoint
  let subfolders = await sp.web
    .getFolderByServerRelativeUrl(folder)
    .folders.get();
  if (subfolders.length === 0) {
    // Base case: all folders have been traversed
    if (stack.length === 0) {
      // Return the a Promise that contains the list of all folders
      return Promise.all(folders);
    }
  } else {
    // If folder does have subfolders, push them onto
    // the stack and into the list of all subfolders
    subfolders.forEach(folder => {
      stack.push(folder["ServerRelativeUrl"]);
      folders.push(folder["ServerRelativeUrl"]);
    });
  }
  // Our next folder is the last one in the stack
  let newFolder = stack.pop();
  // Recursively find subfolders of the new folder
  return getAllFolders(newFolder, stack, folders);
}

/**
 * Initializes the SharePoint fetcher with data specified in SharePoint add-in.
 * @param url The URL of your SharePoint site
 * @param id The client ID of your SharePoint add-in
 * @param secret The client secret of your SharePoint add-in
 * @param realm The realm of your SharePoint add-in
 */
export function initializeFetcher(url, id, secret, realm) {
  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(url, id, secret, realm);
      }
    }
  });
}

/**
 * Get the file type of a file with the given name.
 * @param name The file's full name
 */
export function getFileType(name) {
  // Split a string by periods
  let str = name.split(".");
  // Return only the string after the last period
  return str[str.length - 1];
}
