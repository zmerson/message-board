import axios from 'axios';
import React, { ReactNode, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MainContentContainer } from '../../styles/styles';


interface BoardPost {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
    boardId: number;
}

const NewPost: React.FunctionComponent = () => {
  const { name } = useParams();

  // State for the post content and image upload
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState('')
    const location = useLocation()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const url = location.pathname
    const urlArray = url.split('/')
    const boardName = urlArray[urlArray.length - 2]
    // Process the post data and image here (you can send them to the server, etc.)
    console.log('Content:', content);
    console.log('Image:', image);

    // Reset the form after submission
    setContent('');
    setImage(null);
    const response = await axios.post<BoardPost>('/api/newpost', { title: title, content: content, authorId: 1, boardName: boardName});
    const newPostId = await response.data.id;
    console.log(response)
    }

  return (
    <MainContentContainer>
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title..."
        ></textarea>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your post content..."
        ></textarea>
        {/* <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        /> */}<br></br>
        <button type="submit">Submit</button>
      </form>
      <Link to={`/board/${name}`}>Go back to Board</Link>
    </div>
    </MainContentContainer>
  );
};

export default NewPost;
