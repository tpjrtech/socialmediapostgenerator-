const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
    origin: 'https://www.digitalfacture.com', // Allow requests from your Duda site
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS middleware with specified options
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.post('/generate-post', async (req, res) => {
    const { prompt } = req.body;

    try {
        const openaiApiKey = process.env.OPENAIKEY; // Ensure you have set this in your Replit environment variables
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error generating post:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error generating post', details: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
