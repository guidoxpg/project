import fetch from 'node-fetch';

async function testClaudeAPI() {
  try {
    const response = await fetch('http://localhost:3001/api/chat-with-claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello, Claude!' }]
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testClaudeAPI();