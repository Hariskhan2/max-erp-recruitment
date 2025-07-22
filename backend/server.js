const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Storage
let jobPosts = [];
let nextId = 1;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.method !== 'GET') {
    console.log('Request Body:', req.body);
  }
  next();
});

// Routes
app.get('/api/job-posts', (req, res) => {
  console.log(`Returning ${jobPosts.length} job posts`);
  res.json(jobPosts);
});

app.get('/api/job-posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Looking for job post with ID: ${id}`);
  const jobPost = jobPosts.find(p => p.id === id);
  if (!jobPost) {
    console.log(`Job post with ID ${id} not found`);
    return res.status(404).json({ error: 'Not found' });
  }
  console.log(`Found job post: ${jobPost.title}`);
  res.json(jobPost);
});

app.post('/api/job-posts', (req, res) => {
  const { title, department, employmentType, description, location, deadline } = req.body;
  
  console.log('Creating new job post:', title);
  
  // Basic validation
  if (!title || !department || !employmentType || !description || !location || !deadline) {
    console.log('Validation failed - missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const jobPost = { id: nextId++, ...req.body, createdAt: new Date().toISOString() };
  jobPosts.push(jobPost);
  console.log(`Job post created successfully with ID: ${jobPost.id}`);
  res.status(201).json(jobPost);
});

app.put('/api/job-posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Updating job post with ID: ${id}`);
  
  const index = jobPosts.findIndex(p => p.id === id);
  if (index === -1) {
    console.log(`Job post with ID ${id} not found`);
    return res.status(404).json({ error: 'Not found' });
  }
  
  const { title, department, employmentType, description, location, deadline } = req.body;
  if (!title || !department || !employmentType || !description || !location || !deadline) {
    console.log('Update validation failed - missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  jobPosts[index] = { ...jobPosts[index], ...req.body };
  console.log(`Job post ${id} updated successfully`);
  res.json(jobPosts[index]);
});

app.delete('/api/job-posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Deleting job post with ID: ${id}`);
  
  const index = jobPosts.findIndex(p => p.id === id);
  if (index === -1) {
    console.log(`Job post with ID ${id} not found`);
    return res.status(404).json({ error: 'Not found' });
  }
  
  const deletedPost = jobPosts[index];
  jobPosts.splice(index, 1);
  console.log(`Job post "${deletedPost.title}" deleted successfully`);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('\n================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   GET    /api/job-posts`);
  console.log(`   GET    /api/job-posts/:id`);
  console.log(`   POST   /api/job-posts`);
  console.log(`   PUT    /api/job-posts/:id`);
  console.log(`   DELETE /api/job-posts/:id`);
  console.log('================================\n');
});