const Author = require('../models/author.model');

// Create a new author
async function createAuthor(req, res) {
  try {
    const author = new Author(req.body);
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all authors
async function getAllAuthors(req, res) {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single author
async function getAuthor(req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update an author
async function updateAuthor(req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    Object.assign(author, req.body);
    const updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete an author
async function deleteAuthor(req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    await author.remove();
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createAuthor, getAllAuthors, getAuthor, updateAuthor, deleteAuthor };
