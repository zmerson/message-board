const express = require('express');
const app = express();
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
//separate into multiple files when it gets too big - https://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.use(cors())

app.post('/api/board/info/subscribed', async (req, res) => {
    const { boardId, userId } = req.body
    //console.log(`board id: ${boardId} , userid: ${userId}`)
    let subscribed;
try {
   subscribed = await prisma.userRole.findFirst({
    where: {
      userId: userId,
      boardId: boardId,
    }, 
    select: {
      subscribed: true,
    }
  })
  if (subscribed == null) {
    console.log(" userRole status was not found, creating userRole")
    userRole = await prisma.userRole.create({
      data: {
        userId: userId,
        boardId:  boardId,
        role: 'STANDARD',
        subscribed: false,
      }
    })
    subscribed = false 
    console.log(" set subbed false ")
  }
  else {
    // console.log(JSON.stringify(subscribed))
    // subscribed = await prisma.userRole.findFirst({
    //   where: {
    //         userId: userId,
    //         boardId: boardId,   
    //   },
    //   select: {
    //     subscribed: true,
    //   }
    // })
    }
    console.log(`is ${userId} subscribed to ${boardId}? ` + JSON.stringify(subscribed))
    if (subscribed.subscribed) {
      res.json({ subscribed: true });
    } else {
      res.json({ subscribed: false });
    }
  }
    //res.send(subscribed)
  catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get tags
app.get('/api/board/info/:boardName/tags', async (req, res) => {
  const { boardName } = req.params.boardName
  const tags = await prisma.board.findUnique({
    where: {
      name: boardName,
    },
    include: {
      tags
    }
  })
  res.json(tags)
})
//get userRole
app.post('/api/board/:boardName/userRole', async (req, res) => {
  const { userId, boardId } = req.body
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId: userId,
      boardId: boardId,
    },
  })
  console.log(`returned userRole for boardId=${boardId}, userId =${userId} `)
  res.json(userRole)
})
app.post('/api/:boardName/ban', async (req, res) => {
  const { boardName } = req.params
  const userName = req.body 
  const board = await prisma.board.findFirst({
    where: {
      name: boardName,
    },
  });
  const user = await prisma.user.findFirst({
    where: {
      name: userName
    }
  })
  //upsert userRole to banned=true
})
//update tags
app.post('/api/board/tags/update', async (req, res) => {
  const { boardId, tags } = req.body;
  try {
    // Update the tags for the board with the given boardId
    const updatedBoard = await prisma.board.update({
      where: { id: boardId },
      data: { tags: { set: tags } },
    });
    res.json(updatedBoard);
  } catch (error) {
    console.error('Error updating tags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//unused
app.post('/api/board/info/:name', async (req, res) => {
    const { name } = req.params
try {
  const subscribed = await prisma.userRole.findFirstOrThrow({
    where: { id: userId },
    include: { subscriptions: { where: { id: boardId } } },
  });
}catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.post('/api/unsubscribe', async (req, res) => {
   const { boardId, userId } = req.body
  try {
    userRole = await prisma.userRole.findFirst({
      where: {
        boardId: parseInt(boardId),
        userId: parseInt(userId)
      },
    })
    const updatedUserRole = await prisma.userRole.update({ 
    where: {
      id: UserRole.id,
      userId:userId,
      boardId: boardId,
    },
    data: {
      subscribed: false,
    },
  });
  console.log("UserRole updated:", updatedUserRole);
  }catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
app.post('/api/newboard/set-owner', async (req, res) => {
  const { boardId, userId } = req.body
  console.log(boardId)
  try {
      const existingUserRole = await prisma.userRole.findFirst({
        where: {
          userId: userId,
          boardId: boardId,
        },
      });
      
      if (existingUserRole) {
        const updatedUserRole = await prisma.userRole.update({
          where: {    
              id: existingUserRole.id,    
              userId: userId,
              boardId: boardId,
          },
          data: {
            role: 'OWNER', // Update the role or other fields as needed
            // ... other fields to update
          },
        });
        // Handle the updated entry as needed
        console.log('UserRole updated:', updatedUserRole);
      } else {
        // If the entry does not exist, create a new one
        const newUserRole = await prisma.userRole.create({
          data: {
            userId: userId,
            boardId: boardId,
            subscribed: true,
            role: 'OWNER',
            // ... other fields for the new entry
          },
        });
        // Handle the newly created entry as needed
        console.log('New UserRole created:', newUserRole);
        res.json(newUserRole)
      }
  }catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.post('/api/subscribe', async (req, res) => {
   const { boardName, userId } = req.body
try {
  const board = await prisma.board.findFirst({
    where: {
      name: boardName,
    },
  });
  console.log('board is ' + board)
  if (board){
    const userRole = await prisma.userRole.findFirstOrThrow({
      where: {
        userId,
        boardId: board.id,
      }
    })
    console.log(`user ${userId} has role ${JSON.stringify(userRole)} on board ${board} before upsert`)
    const subscribed = await prisma.userRole.upsert({
      where: {
        id: userRole.id,
        userId,
        boardId: board.id,
      },
      update: {
        subscribed: true,
      },
      create: {
        board: {
          connect: {
            id: board.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        subscribed: true,
        role: 'STANDARD',
      }
    });
    console.log("upserted " + subscribed)
  }
  res.send(true)
}catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

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
    // console.log(JSON.stringify(boards))
    
    res.json(boards);

  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

app.post('/api/newboard', async (req, res) => {
  const { name, userId } = req.body;

  try {
    // console.log(postedBy)
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
});

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
