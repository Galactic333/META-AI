const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Your HTML file goes in 'public' folder

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-2f9aa1872a1543f09b482bb566d9e0b7', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: req.body.message }]
      })
    });
    
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'API call failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));