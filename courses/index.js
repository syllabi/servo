"use strict";

exports.create = (request, response) => {
  const message = {
    path: request.path,
    functionName: "create",
    subDir: "courses",
  };
  response.status(200).send(JSON.stringify(message));
};

exports.all = (request, response) => {
  const message = {
    path: request.path,
    functionName: "all",
    subDir: "courses",
  };
  response.status(200).send(JSON.stringify(message));
};
