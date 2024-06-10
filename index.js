const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create (POST)
app.post('/tests', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newTest = await prisma.test.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ error: `An error occurred: ${error.message}` });
  }
});

// Read (GET)
app.get('/tests', async (req, res) => {
  try {
    const tests = await prisma.test.findMany();
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ error: `An error occurred: ${error.message}` });
  }
});

// Update (PUT)
app.put('/tests/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedTest = await prisma.test.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(400).json({ error: `An error occurred: ${error.message}` });
  }
});

// Delete (DELETE)
app.delete('/tests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.test.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: `An error occurred: ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});