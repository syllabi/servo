"use strict";

const mongoClient = require("mongodb").MongoClient;
const { v4 } = require("uuid");

exports.create = async (request, response) => {
  try {
    const client = await mongoClient.connect(process.env.CONNECTION_STRING, {
      useUnifiedTopology: true,
    });

    if (!client) {
      return response
        .status(500)
        .json({ body: "Server Error. Connection to DB Failed!" });
    }

    const db = client.db("syllabi");

    const {
      courseId,
      title,
      thumbnail,
      description,
      university,
    } = request.body;

    if (!courseId || !title || !thumbnail || !university) {
      return response.status(400).json({
        body: "Missing Fields. Please try again",
      });
    }

    const isExisting = await db
      .collection("courses")
      .findOne({ courseId, university }, { limit: 1 });

    if (isExisting) {
      return response.status(400).json({
        body:
          "Course for the required university already exists. Please try again",
      });
    }

    const newCourse = {
      id: v4(),
      courseId,
      title,
      thumbnail,
      description: description || "",
      university,
      playlists: [],
      createdOn: new Date(),
      lastModified: new Date(),
    };

    const doc = await db.collection("courses").insertOne(newCourse);

    if (!doc) {
      return response.status(400).json({
        body: "Something went wrong. Please try again",
      });
    }

    response.status(200).json({ body: doc });
  } catch (err) {
    response.status(500).json({ body: err.message });
  }
};

exports.all = (request, response) => {
  const message = {
    path: request.path,
    functionName: "all",
    subDir: "courses",
  };
  response.status(200).send(JSON.stringify(message));
};

exports.single = (request, response) => {
  const message = {
    path: request.path,
    functionName: "all",
    subDir: "courses",
  };
  response.status(200).send(JSON.stringify(message));
};
