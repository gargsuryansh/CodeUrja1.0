import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import './Editor.css';

const socket = io('http://localhost:3001');

const EditorComponent = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (roomId) {
      socket.emit('join-room', roomId);
    }

    socket.on('code-change', (newCode) => {
      setCode(newCode);
    });

    socket.on('user-joined', (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on('user-left', (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    });

    return () => {
      socket.off('code-change');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('code-change', { code: newCode, roomId });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="language-selector">
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="room-info">
          <span>Room ID: {roomId}</span>
          <span>Users: {users.length}</span>
        </div>
      </div>
      <div className="editor-main">
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={(code) => highlight(code, languages[language], language)}
          padding={10}
          textareaClassName="code-editor"
          preClassName="code-output"
          language={language}
          theme="tomorrow"
        />
      </div>
    </div>
  );
};

export default EditorComponent; 