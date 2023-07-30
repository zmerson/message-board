const express = require('express');
const app = express();
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
//separate into multiple files when it gets too big - https://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4
const prisma = new PrismaClient(); // Instantiate PrismaClient

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.use(cors())


app.get('/api/boards', async (req, res) => {
    
  try{
    const boards = await prisma.board.findMany({
      include: {
        owner: {
          select: {
            name: true,
          },
        },
      }
    });
    console.log(JSON.stringify(boards))
    
    res.json(boards);

  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  })
app.
app.post('/api/newboard', async (req, res) => {
  const { name, userId } = req.body;

  try {
    console.log(postedBy)
    const newBoard = await prisma.board.create({
      data: {
        name,
        userId,
      },
    });
    res.status(201).json(newBoard);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/newpost', async (req, res) => {
  const {title, content, authorId, boardName} = req.body;

  try {
    const boardId = await prisma.board.findUnique({
      where: {
         name: boardName 
      }
    })
    const time = new Date().toISOString()
    console.log("time is" + time)
    console.log("board is " + JSON.stringify(boardId))
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: authorId
          }
        },
        published: true,
        Board: {
          connect: {
            id: boardId.id
          }
        },
        createdAt: time
      }
    })
    res.status(201).json(newPost);

  }catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal server error'})
  }
})
app.post('/api/create-account', async (req, res) => {
    const {email, name, password} = req.body;
    let user = false;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user){
          console.log(" user was not found, creating user")
          newuser = await prisma.user.create({
            //const hashedPassword = await bcrypt.hash(password, 10);
            data: {
              email, name, password
            }
          });
        res.status(201).json({ message: 'User created successfully', newuser });
      } else {
        return res.status(400).json({ error: 'User already exists' })
      }
    }
    catch(error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' }); 
    }
});
app.get('/api/board/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: { name: name },
      include: { posts: true },
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/my-posts', async (req, res) => {
  const { authorId } = req.body;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        authoriD: authorId
      }
    })
  }catch (error){
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  res.json({posts});
})
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("user from server was: " + JSON.stringify(user))
    if (!user || user.password !== password) {
      console.log("error1 was: " + user.password + " vs password u put " + password)
      return res.status(401).json({ error: 'Invalid credentials' });
    }

      const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });
      
      res.json({ user, token });
    } catch(error) {
      console.log("error2 was: " + error)
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  const port = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
