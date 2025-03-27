
export interface Language {
  id: string;
  name: string;
  mode: string;
  extension: string;
  example: string;
}

export const languages: Language[] = [
  {
    id: "javascript",
    name: "JavaScript",
    mode: "javascript",
    extension: "js",
    example: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate and print first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`
  },
  {
    id: "typescript",
    name: "TypeScript",
    mode: "typescript",
    extension: "ts",
    example: `// TypeScript Example
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate and print first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`
  },
  {
    id: "python",
    name: "Python",
    mode: "python",
    extension: "py",
    example: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate and print first 10 fibonacci numbers
for i in range(10):
    print(fibonacci(i))`
  },
  {
    id: "java",
    name: "Java",
    mode: "java",
    extension: "java",
    example: `// Java Example
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1)
            return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        // Calculate and print first 10 fibonacci numbers
        for (int i = 0; i < 10; i++) {
            System.out.println(fibonacci(i));
        }
    }
}`
  },
  {
    id: "csharp",
    name: "C#",
    mode: "csharp",
    extension: "cs",
    example: `// C# Example
using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1)
            return n;
        return Fibonacci(n-1) + Fibonacci(n-2);
    }
    
    static void Main() {
        // Calculate and print first 10 fibonacci numbers
        for (int i = 0; i < 10; i++) {
            Console.WriteLine(Fibonacci(i));
        }
    }
}`
  },
  {
    id: "cpp",
    name: "C++",
    mode: "cpp",
    extension: "cpp",
    example: `// C++ Example
#include <iostream>

int fibonacci(int n) {
    if (n <= 1)
        return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    // Calculate and print first 10 fibonacci numbers
    for (int i = 0; i < 10; i++) {
        std::cout << fibonacci(i) << std::endl;
    }
    return 0;
}`
  },
  {
    id: "html",
    name: "HTML",
    mode: "html",
    extension: "html",
    example: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>This is a simple HTML example.</p>
    </div>
</body>
</html>`
  },
  {
    id: "css",
    name: "CSS",
    mode: "css",
    extension: "css",
    example: `/* CSS Example */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #2c3e50;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 10px;
}

button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}`
  },
  {
    id: "rust",
    name: "Rust",
    mode: "rust",
    extension: "rs",
    example: `// Rust Example
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    // Calculate and print first 10 fibonacci numbers
    for i in 0..10 {
        println!("{}", fibonacci(i));
    }
}`
  },
  {
    id: "go",
    name: "Go",
    mode: "go",
    extension: "go",
    example: `// Go Example
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    // Calculate and print first 10 fibonacci numbers
    for i := 0; i < 10; i++ {
        fmt.Println(fibonacci(i))
    }
}`
  }
];

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find(lang => lang.id === id);
};

export const getLanguageByExtension = (ext: string): Language | undefined => {
  return languages.find(lang => lang.extension === ext);
};

export const getDefaultLanguage = (): Language => {
  return languages[0]; // JavaScript as default
};
