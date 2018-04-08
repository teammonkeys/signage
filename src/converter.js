"use strict";

var _ = require("lodash"),
  childProcess = require("child_process"),
  spawn = require("cross-spawn"),
  mime = require("mime"),
  debug = require("debug")("unoconv");

/**
 * Convert a document.
 *
 * @param {String} file
 * @param {String} format
 * @param {Object|Function} options
 * @param {Function} callback
 */
function convert(file, format, options, callback) {
  var args,
    bin,
    child,
    stdout = [],
    stderr = [];

  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  if (!_.isObject(options)) {
    options = {};
  }
  args = ["unoconv", "--format=" + format];

  if (options.port) {
    args.push("--port=" + options.port);
  }

  if (options.out) {
    args.push("--output=" + options.out);
  } else {
    args.push("--stdout");
  }

  args.push(file);

  if (options.bin) {
    bin = options.bin;
  }
  debug("CMD:", bin + "  " + args.join(" "));
  child = spawn(bin, args);
  child.on("error", function(err) {
    return callback(new Error(err));
  });

  child.stdout.on("data", function(data) {
    stdout.push(data);
  });

  child.stderr.on("data", function(data) {
    stderr.push(data);
  });

  child.on("exit", function() {
    if (stderr.length) {
      return callback(new Error(Buffer.concat(stderr).toString()));
    }

    callback(null, Buffer.concat(stdout));
  });
}

/**
 * Start a listener.
 *
 * @param {Object} options
 * @return {ChildProcess}
 */
function listen(options) {
  var args, bin;

  args = ["unoconv", "--listener"];
  if (_.isObject(options)) {
    if (options.port) {
      args.push("-p" + options.port);
    }

    if (options.bin) {
      bin = options.bin;
    }
  }

  return spawn(bin, args);
}

module.exports.convert = convert;
module.exports.listen = listen;
