const io = require("socket.io")();
const fs = require("fs");
const {
  initializeFetcher,
  fetchAllSPMetadata,
  fetchSPFile,
  convertBufferToString,
  convertOfficeToPdf
} = require("./fetcher");
const converter = require("./converter");

io.on("connection", client => {
  initializeFetcher(
    "https://rowansweng.sharepoint.com",
    "155584b4-5dc2-4283-949d-af5986e39eb3",
    "77IjS/vtrFuYXk2mq0XwA5AeX2Vy7ze0OvnikvWkfb4=",
    "c437039a-84e9-47f2-ac34-b703bb7fcc59"
  );
  client.on("fetchAllSPMetadata", interval => {
    fetchAllSPMetadata().then(spFiles => {
      client.emit("spFiles", spFiles);
    });
  });
  client.on("fetchSPFile", interval => {
    fetchSPFile(".docx", "/Shared Documents/Documents/declaration.docx").then(
      spFile => {
        fs.writeFileSync("unconverted.docx", spFile);
        converter.convert(
          "unconverted.docx",
          "pdf",
          { bin: "assets/LibreOffice/program/python" },
          (err, result) => {
            if (err) console.log(err);
            //fs.writeFileSync("converted.pdf", result);
            client.emit("spFile", result);
            console.log(result);
            fs.unlinkSync("unconverted.docx");
          }
        );
      }
    );
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
