let originalFacebookPost = '';
let originalInstagramPost = '';

document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Generate Posts button clicked');

    const eventName = document.getElementById('event-name').value;
    const details = document.getElementById('details').value;
    const shoutouts = document.getElementById('shoutouts').value;
    const venue = document.getElementById('venue').value;
    const hashtags = document.getElementById('hashtags').value;
    const vendors = document.getElementById('vendors').value;
    const limitLength = document.getElementById('limit-length').checked;

    const basePrompt = `
        You are a social media manager for Roc Your Event, a photo booth company that specializes in premium photo booth rentals in the Rochester, NY market. 
        Write a social media post recapping what a fun time we had at the event called ${eventName}. 
        Include the following details: ${details}. 
        Venue: ${venue}.
        ${shoutouts ? `Shoutouts: ${shoutouts}.` : ''}
        ${hashtags ? `Hashtags: ${hashtags} #rocyourevent.` : '#rocyourevent.'}
        ${vendors ? `Vendors we worked with: ${vendors}.` : ''}
        Express gratitude to the hosts and highlight the fun times we had. Make the post engaging and warm.
    `;

    const facebookPrompt = basePrompt + (limitLength ? ' Ensure the post is within the optimal length of 40-80 characters for Facebook.' : '');
    const instagramPrompt = basePrompt + (limitLength ? ' Ensure the post is within the optimal length of 138-150 characters for Instagram.' : '');

    originalFacebookPost = await generatePost(facebookPrompt, 'facebook-post-content');
    originalInstagramPost = await generatePost(instagramPrompt, 'instagram-post-content');
});

document.getElementById('refine-button').addEventListener('click', async function() {
    console.log('Refine Posts button clicked');
    const refineInstructions = document.getElementById('refine-instructions').value;

    const refineFacebookPrompt = `
        You are a social media manager for Roc Your Event, a photo booth company that specializes in premium photo booth rentals in the Rochester, NY market. 
        Refine the following social media post to make it more engaging and warm. Keep the original content and enhance it based on the instructions provided. 
        Original post: "${originalFacebookPost}".
        Instructions: ${refineInstructions}.
        Ensure the post is within the optimal length of 40-80 characters for Facebook.
        Always include the hashtag #rocyourevent.
    `;

    const refineInstagramPrompt = `
        You are a social media manager for Roc Your Event, a photo booth company that specializes in premium photo booth rentals in the Rochester, NY market. 
        Refine the following social media post to make it more engaging and warm. Keep the original content and enhance it based on the instructions provided. 
        Original post: "${originalInstagramPost}".
        Instructions: ${refineInstructions}.
        Ensure the post is within the optimal length of 138-150 characters for Instagram.
        Always include the hashtag #rocyourevent.
    `;

    originalFacebookPost = await generatePost(refineFacebookPrompt, 'facebook-post-content');
    originalInstagramPost = await generatePost(refineInstagramPrompt, 'instagram-post-content');
});

async function generatePost(prompt, elementId) {
    console.log('Generating post with prompt:', prompt);

    try {
        const response = await fetch('https://fbba4bfb-5ca8-4a51-b46f-9057bc4e3f60-00-1vs5l3g9mqsw1.kirk.replit.dev/generate-post', { // Replit app URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server error details:', errorDetails);
            throw new Error(`Server error: ${errorDetails}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.choices && data.choices[0] && data.choices[0].message) {
            const generatedPost = data.choices[0].message.content.trim();
            document.getElementById(elementId).value = generatedPost;
            document.getElementById('generated-posts').style.display = 'block';
            const refineSection = document.getElementById('refine-section');
            if (refineSection) {
                refineSection.style.display = 'block';
            }
            return generatedPost; // Return the generated post
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error generating post:', error);
        document.getElementById(elementId).value = 'Error generating post. Please try again.';
        const refineSection = document.getElementById('refine-section');
        if (refineSection) {
            refineSection.style.display = 'none';
        }
    }
    return ''; // Return an empty string in case of error
}

document.getElementById('copy-facebook-post').addEventListener('click', function() {
    copyToClipboard('facebook-post-content');
});

document.getElementById('copy-instagram-post').addEventListener('click', function() {
    copyToClipboard('instagram-post-content');
});

document.getElementById('copy-both-posts').addEventListener('click', function() {
    console.log('Copy Both Posts button clicked');
    copyBothPosts();
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).value;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard');
}

function copyBothPosts() {
    console.log('Copying both posts to clipboard');
    const facebookPost = document.getElementById('facebook-post-content').value;
    const instagramPost = document.getElementById('instagram-post-content').value;
    const combinedText = `Facebook Post:\n${facebookPost}\n\nInstagram Post:\n${instagramPost}`;
    const textarea = document.createElement('textarea');
    textarea.value = combinedText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Both posts copied to clipboard');
}

document.getElementById('clear-form').addEventListener('click', function() {
    document.getElementById('post-form').reset();
    document.getElementById('generated-posts').style.display = 'none';
    document.getElementById('refine-section').style.display = 'none';
});
