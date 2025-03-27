import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Editor from 'react-simple-code-editor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeEditor.css';

const socket = io('http://localhost:5000');

const languages = {
  javascript: {
    name: 'JavaScript',
    extension: 'js',
    syntax: 'javascript'
  },
  python: {
    name: 'Python',
    extension: 'py',
    syntax: 'python'
  },
  java: {
    name: 'Java',
    extension: 'java',
    syntax: 'java'
  },
  cpp: {
    name: 'C++',
    extension: 'cpp',
    syntax: 'cpp'
  },
  html: {
    name: 'HTML',
    extension: 'html',
    syntax: 'html'
  },
  css: {
    name: 'CSS',
    extension: 'css',
    syntax: 'css'
  }
};

const CodeEditor = ({ roomId, userName }) => {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const editorRef = useRef(null);

  useEffect(() => {
    // Join room when component mounts
    socket.emit('join', { roomId, userName });

    // Listen for code updates
    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
    });

    // Listen for user list updates
    socket.on('userJoined', (userList) => {
      setUsers(userList);
    });

    // Listen for language updates
    socket.on('languageUpdate', (newLanguage) => {
      setLanguage(newLanguage);
    });

    // Listen for typing indicators
    socket.on('userTyping', (typingUser) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leaveRoom');
      socket.off('codeUpdate');
      socket.off('userJoined');
      socket.off('languageUpdate');
      socket.off('userTyping');
    };
  }, [roomId, userName]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('codeChange', { roomId, code: newCode });
    socket.emit('typing', { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit('languageChange', { roomId, language: newLanguage });
  };

  const handleCursorChange = (e) => {
    const textarea = e.target;
    const lines = textarea.value.split('\n');
    const currentLine = lines.length;
    const currentColumn = textarea.value.length - textarea.value.lastIndexOf('\n');
    setCursorPosition({ line: currentLine, column: currentColumn });
  };

  const highlightCode = (code) => (
    <SyntaxHighlighter
      language={languages[language].syntax}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        background: 'transparent',
        fontSize: '14px',
        fontFamily: 'Fira Code, Consolas, monospace'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-controls">
          <select value={language} onChange={handleLanguageChange}>
            {Object.entries(languages).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="room-info">
            Room ID: <span className="room-id">{roomId}</span>
          </div>
          <div className="cursor-position">
            Line {cursorPosition.line}, Column {cursorPosition.column}
          </div>
        </div>
        <div className="users-list">
          Users in room: {users.join(', ')}
          {isTyping && <span className="typing-indicator">Someone is typing...</span>}
        </div>
      </div>
      <div className="editor-container">
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={highlightCode}
          onCursorChange={handleCursorChange}
          placeholder="Start coding..."
          className="editor-content"
          textareaClassName="editor-textarea"
          preClassName="editor-pre"
          padding={10}
          tabSize={4}
          insertSpaces={true}
          ignoreTabKey={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor; 