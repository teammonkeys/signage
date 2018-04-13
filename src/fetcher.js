const { SPFetchClient } = require("@pnp/nodejs");
const { sp } = require("@pnp/sp");
const createDataUri = require("create-data-uri");
const base64_arraybuffer = require("base64-arraybuffer");
const unoconv = require("unoconv");
const openSocket = require("socket.io-client");
const socket = openSocket("http://localhost:8000");

const documentTypes = ["pdf", "docx", "doc", "pptx", "ppt", "rtf", "txt"];
const imageTypes = ["png", "gif", "jpg", "jpeg"];
const videoTypes = ["mp4", "avi", "wmv", "mov"];
const validFileTypes = documentTypes.concat(imageTypes.concat(videoTypes));

function convertOfficeToPdf(documentBuffer) {
  unoconv.convert(documentBuffer, "pdf", ["./", 2002], function(err, result) {
    fs.writeFile("converted.pdf", result);
    const pdfBuffer = result;
    console.log(pdfBuffer);
    return pdfBuffer;
  });
  //return base64_arraybuffer.encode(pdfBuffer);
}

function convertBufferToString(buffer) {
  return base64_arraybuffer.encode(buffer);
}

async function fetchSPFile(fileType, url) {
  return sp.web.getFileByServerRelativeUrl(url).getBuffer();
}

/** Return a Promise that contains all SharePoint files. */
async function fetchAllSPMetadata() {
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
          fileType: fileType,
          category: getCategory(fileType) // Assign the file a category, such as "document"
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
async function getAllFolders(folder, stack, folders) {
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
function initializeFetcher(url, id, secret, realm) {
  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(url, id, secret, realm);
      }
    }
  });
}

/**
 * Returns the category of a given file type. Used for sorting purposes.
 * @param {string} fileType The file type to be categorized
 */
function getCategory(fileType) {
  if (documentTypes.includes(fileType)) return "document";
  if (imageTypes.includes(fileType)) return "image";
  if (videoTypes.includes(fileType)) return "video";
  return "invalid";
}

/**
 * Get the file type of a file with the given name.
 * @param name The file's full name
 */
function getFileType(name) {
  // Split a string by periods
  let str = name.split(".");
  // Return only the string after the last period
  return str[str.length - 1];
}

module.exports.initializeFetcher = initializeFetcher;
module.exports.fetchAllSPMetadata = fetchAllSPMetadata;
module.exports.fetchSPFile = fetchSPFile;
module.exports.convertBufferToString = convertBufferToString;
module.exports.convertOfficeToPdf = convertOfficeToPdf;
