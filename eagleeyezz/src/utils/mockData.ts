
export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
  active: boolean;
}

export interface CodeEdit {
  userId: string;
  line: number;
  column: number;
  timestamp: number;
}

// Mock users for collaboration simulation
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "You",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    color: "#3B82F6",
    active: true
  },
  {
    id: "user2",
    name: "Alex Chen",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    color: "#10B981",
    active: true
  },
  {
    id: "user3",
    name: "Jamie Smith",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    color: "#F59E0B",
    active: true
  },
  {
    id: "user4",
    name: "Taylor Kim",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    color: "#EC4899",
    active: false
  }
];

// Simulate edits by random users at random positions
export const simulateEdit = (): CodeEdit => {
  const activeUsers = mockUsers.filter(user => user.active && user.id !== "user1");
  const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
  
  return {
    userId: randomUser.id,
    line: Math.floor(Math.random() * 20) + 1,
    column: Math.floor(Math.random() * 40) + 1,
    timestamp: Date.now()
  };
};

// Mock output for the code execution
export const mockOutput = (language: string): string => {
  if (language === "javascript" || language === "typescript") {
    return `0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n`;
  } else if (language === "python") {
    return `0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n`;
  } else if (language === "java" || language === "csharp" || language === "cpp") {
    return `0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n`;
  } else if (language === "rust" || language === "go") {
    return `0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n`;
  } else if (language === "html") {
    return `<div>HTML output would be rendered in browser</div>`;
  } else if (language === "css") {
    return `/* CSS would be applied to HTML elements */`;
  } else {
    return `Execution complete for ${language}`;
  }
};
