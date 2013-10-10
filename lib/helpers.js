// Generated by CoffeeScript 1.6.3
/*
Copyright 2013 Simon Lydell

This file is part of map-replace.

map-replace is free software: you can redistribute it and/or modify it under the terms of the GNU
General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

map-replace is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License along with map-replace. If not,
see <http://www.gnu.org/licenses/>.
*/

var escapeRegex, fs, mapReplace, modify, readStdin;

fs = require("fs");

escapeRegex = require("escape-regexp-component");

modify = function(file, modifyFn, callback) {
  return fs.readFile(file, function(error, contents) {
    if (error) {
      return callback(error);
    }
    try {
      contents = modifyFn(contents.toString());
    } catch (_error) {
      error = _error;
      return callback(error);
    }
    return fs.writeFile(file, contents, function(error) {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  });
};

mapReplace = function(string, map, options) {
  var regex, replace, replacement, searchString, _ref;
  if (options == null) {
    options = {};
  }
  if (typeof map === "string") {
    map = JSON.parse(map);
  }
  if (options.match) {
    regex = RegExp(options.match, "g" + ((_ref = options.flags) != null ? _ref : ""));
  }
  for (searchString in map) {
    replacement = map[searchString];
    replace = function(string) {
      return string.replace(RegExp(escapeRegex(searchString), "g"), replacement);
    };
    string = regex ? string.replace(regex, replace) : replace(string);
  }
  return string;
};

readStdin = function(process, callback) {
  var contents, stdin;
  stdin = process.stdin;
  stdin.resume();
  contents = "";
  stdin.on("data", function(data) {
    return contents += data;
  });
  return stdin.on("end", function() {
    return callback(contents);
  });
};

module.exports = {
  modify: modify,
  mapReplace: mapReplace,
  readStdin: readStdin
};