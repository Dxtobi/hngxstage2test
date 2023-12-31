const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5888;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/db_test_user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const checkNameIsString = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name must be a string' });
  }
  next();
};

// Define the Person model
const Person = require('./model/person');

// Create a new person
app.post('/api', checkNameIsString, async (req, res) => {
  try {
    const { name } = req.body;
    const personByName = await Person.findOne({ name: name.toLowerCase() });
    if (personByName) {
      return res.status(404).json({ error: 'Person Already Exist' });
    }
    const person = new Person({ name: name.toLowerCase() });
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a person by ID or Name
app.get('/api/:param', async (req, res) => {
  try {
    const param = req.params.param;

    // Check if param is a valid ObjectId (for ID-based query)
    if (mongoose.isValidObjectId(param)) {
      const person = await Person.findById(param);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      return res.json(person);
    }

    // If not a valid ObjectId, assume it's a name
    const personByName = await Person.findOne({ name: param.toLowerCase() });
    if (!personByName) {
      return res.status(404).json({ error: 'Person not found' });
    }
    return res.json(personByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all persons
app.get('/api', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a person by ID or Name
app.put('/api/:param', checkNameIsString, async (req, res) => {
  try {
    const { name } = req.body;
    const param = req.params.param;

    // Check if param is a valid ObjectId (for ID-based update)
    if (mongoose.isValidObjectId(param)) {
      const person = await Person.findByIdAndUpdate(
        param,
        { name: name.toLowerCase() },
        { new: true }
      );
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      return res.json(person);
    }

    // If not a valid ObjectId, assume it's a name
    const personByName = await Person.findOneAndUpdate(
      { name: param.toLowerCase() },
      { name: name.toLowerCase() },
      { new: true }
    );
    if (!personByName) {
      return res.status(404).json({ error: 'Person not found' });
    }
    return res.json(personByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a person by ID or Name
app.delete('/api/:param', async (req, res) => {
  try {
    const param = req.params.param;

    // Check if param is a valid ObjectId (for ID-based delete)
    if (mongoose.isValidObjectId(param)) {
      const person = await Person.findByIdAndDelete(param);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      return res.json({ message: 'Person deleted' });
    }

    // If not a valid ObjectId, assume it's a name
    const personByName = await Person.findOneAndDelete({ name: param.toLowerCase() });
    if (!personByName) {
      return res.status(404).json({ error: 'Person not found' });
    }
    return res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
