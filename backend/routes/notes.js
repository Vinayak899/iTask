const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const app = express();

// ROUTE 1: Fetch all the notes of the logged in user. login required
app.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
  }
});

// ROUTE 2: add notes of the logged in user. login required
app.post(
  "/addnote",
  fetchUser,
  [body("title").exists(), body("description").exists()],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 3: update a note of the logged in user. login required

app.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return req.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});

// ROUTE 4: Delete a note of the logged in user. login required
app.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if the note belong to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("Note has been successfully deleted");
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});
module.exports = app;