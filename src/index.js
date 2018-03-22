import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import "./css/App.css";
import App from "./components/App";
import { SPFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";
import $ from "jquery";

// EXECUTED CODE //

// Initialize the SharePoint fetcher with the values from the SharePoint add-in
start(
  "https://rowansweng.sharepoint.com",
  "155584b4-5dc2-4283-949d-af5986e39eb3",
  "77IjS/vtrFuYXk2mq0XwA5AeX2Vy7ze0OvnikvWkfb4=",
  "c437039a-84e9-47f2-ac34-b703bb7fcc59"
);
// Return all SharePoint files as a Promise

/////getAllFiles();

// Load the React Router, which sends the user to different pages in the app
ReactDOM.render(<Router />, document.getElementById("root"));

// END CODE //

async function getAllFiles() {
  // The first folder to traverse is the root folder, called "Shared Documents"
  const folder = "/Shared Documents";
  // This stack will contain subfolders to be checked for other subfolders
  const stack = [];
  // Start the list of folders with a reference to the root folder
  const folders = [folder];
  // Retrieve a list of all folders
  const allFolders = await getAllFolders(folder, stack, folders);
  // Create an array for raw JSON files
  let fileArray = [];
  // Save a reference to the current file
  let file;
  for (let i = 0; i < allFolders.length; i++) {
    // Save the JSON data of the file at the current folder
    file = await getFilesJson(allFolders[i]);
    // Add the current file to the array
    fileArray.push(file);
  }
  // Create an array to hold processed files
  let files = [];
  // Process files from the array of raw files into usable files
  files = getFilesFromArray(fileArray);
  console.log(files);
  return files;
}

/**
 * Converts an array of files as arrays (after conversion from JSON) into
 * objects of type File with name, type, and url properties.
 * @param filesArray The raw array of files to be converted
 */
function getFilesFromArray(fileArray) {
  let file, name, type, url;
  let files = [];
  let rawFiles = [];
  // Convert all JSON files fetched from SharePoint into arrays
  for (let i = 0; i < fileArray.length; i++) {
    file = fileArray[i];
    if (file.length > 0) {
      file = getArrayFromJson(file);
      // Put all arrays into a parent array to be returned
      for (let j = 0; j < file.length; j++) {
        rawFiles.push(file[j]);
      }
    }
  }
  rawFiles.forEach(element => {
    name = getFileName(element);
    type = getFileType(name);
    url = getFileUrl(element);
    files.push(new File(name, type, url));
  });
  return files;
}

/**
 * Recursively find and return every folder on the SharePoint server
 * as an array of strings. Operates asynchronously.
 * @param folder The current folder to be checked for subfolders
 * @param stack The stack of remaining folders to check
 * @param folders The list of all folder and subfolder paths
 * @return The list of all folder and subfolder paths
 */
function getAllFolders(folder, stack, folders) {
  // Fetch the JSON data from SharePoint
  return getFoldersJson(folder)
    .then(json => {
      // Convert the JSON into an array of usable files
      return getArrayFromJson(json);
    })
    .then(array => {
      // Convert the array into a list of subfolder paths
      return getSubfolders(array);
    })
    .then(subfolders => {
      // If folder has no subfolders, proceed to return
      if (subfolders.length === 0) {
        // Base case: all folders have been traversed
        if (stack.length === 0) {
          // Return the list of all folders
          return folders;
        }
      } else {
        // If folder does have subfolders, push them onto
        // the stack and into the list of all subfolders
        subfolders.forEach(folder => {
          stack.push(folder);
          folders.push(folder);
        });
      }
      // Our next folder is the last one in the stack
      let newFolder = stack.pop();
      // Recursively find subfolders of the new folder
      return getAllFolders(newFolder, stack, folders);
    });
}

/**
 * Converts a given JSON file to an array to make its data
 * easier to work with.
 * @param json The given JSON file
 */
function getArrayFromJson(json) {
  const array = [];
  json.forEach(value => {
    array.push(
      $.map(value, function(value, index) {
        return [value];
      })
    );
  });
  return array;
}

/**
 * Return all subfolders of a given parent folder.
 * @param folder The given parent folder
 */
function getFoldersJson(folder) {
  return sp.web.getFolderByServerRelativeUrl(folder).folders.get();
}

/**
 * Return all files in a given folder.
 * @param folder The given folder
 */
function getFilesJson(folder) {
  return sp.web.getFolderByServerRelativeUrl(folder).files.get();
}

/**
 * Initializes the SharePoint fetcher with data specified in SharePoint add-in.
 * @param url The URL of your SharePoint site
 * @param id The client ID of your SharePoint add-in
 * @param secret The client secret of your SharePoint add-in
 * @param realm The realm of your SharePoint add-in
 */
function start(url, id, secret, realm) {
  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(url, id, secret, realm);
      }
    }
  });
}

/**
 * Return all subfolders of the given folder.
 * @param folder The given folder
 */
function getSubfolders(folder) {
  const subfolders = [];
  folder.forEach(folder => {
    subfolders.push(getFolderUrl(folder));
  });
  return subfolders;
}

/**
 * Return the filename of a given file.
 * @param file The given file
 */
function getFileName(file) {
  return file[16];
}

/**
 * Return the relative SharePoint URL of a given folder.
 * @param folder The given folder
 */
function getFolderUrl(folder) {
  return folder[8];
}

/**
 * Return the relative SharePoint URL of a given file.
 * @param file The given file
 */
function getFileUrl(file) {
  return file[17];
}

/**
 * Get the file type of a file with the given name
 * @param name The file's full name
 */
function getFileType(name) {
  // Split a string by periods
  let str = name.split(".");
  // Return only the string after the last period
  return str[str.length - 1];
}

/**
 * A File object with the relevant properties extracted from
 * array format
 */
class File {
  constructor(name, type, url) {
    this.name = name;
    this.type = getFileType(name);
    this.url = url;
  }
}
