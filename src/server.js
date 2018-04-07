const io = require("socket.io")();
const {
  initializeFetcher,
  fetchAllSPMetadata,
  fetchSPFile,
  convertOfficeToPdf
} = require("./fetcher");

main();

async function main() {
  io.on("connection", client => {
    initializeFetcher(
      "https://rowansweng.sharepoint.com",
      "155584b4-5dc2-4283-949d-af5986e39eb3",
      "77IjS/vtrFuYXk2mq0XwA5AeX2Vy7ze0OvnikvWkfb4=",
      "c437039a-84e9-47f2-ac34-b703bb7fcc59"
    );
    client.on("fetchAllSPMetadata", interval => {
      fetchAllSPMetadata().then(spFiles => {
        console.log(spFiles);
        client.emit("spFiles", spFiles);
      });
      //console.log("client is subscribing to timer with interval ", interval);
    });
    client.on("fetchSPFile", interval => {
      fetchSPFile(".docx", "/Shared Documents/Documents/declaration.docx").then(
        spFile => {
          const base64 = convertOfficeToPdf(spFile);
          console.log(spFile);
          client.emit("spFile", spFile);
        }
      );
    });
  });

  const port = 8000;
  io.listen(port);
  console.log("listening on port ", port);
}
