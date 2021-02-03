import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    console.log("getting");
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
    console.log("getted");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log("createPost");

  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("updating");
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(409).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true }); // {new: true} recieve the updated version of the post
  res.json(updatedPost);
  console.log("updated");
};

export const deletePost = async (req, res) => {
  console.log("deleting");
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(409).send("No post with that id");

  await PostMessage.findByIdAndDelete(_id);
  res.sendStatus(204);
};
