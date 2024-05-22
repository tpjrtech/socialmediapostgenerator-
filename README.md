# Social Media Post Generator

This project is a custom widget for generating social media posts using the OpenAI GPT-4o model. It allows users to input event details, shoutouts, hashtags, and vendor tags to create personalized and engaging social media posts for platforms like Facebook and Instagram. The widget is designed to be integrated into a Duda website and includes options to refine generated posts.

## Key Features

- **Event Details Input**: Users can input the name, details, and venue of the event.
- **Optional Shoutouts**: Include optional shoutouts to thank specific individuals or groups.
- **Hashtags**: Add hashtags to the post, with the default `#rocyourevent` always included.
- **Vendor Tags**: Include tags for photographers, catering companies, and other vendors involved in the event.
- **Post Length Limitation**: Option to keep the post within the recommended length for Facebook (40-80 characters) and Instagram (138-150 characters).
- **Generated Posts Refinement**: Users can refine generated posts based on specific instructions.
- **Copy to Clipboard**: Copy generated Facebook and Instagram posts separately or both at once.
- **Clear Form**: Button to clear the form inputs.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/social-media-post-generator.git
    cd social-media-post-generator
    ```

2. **Open the Project in Your IDE**.

3. **Add Your OpenAI API Key**:
    - Store your OpenAI API key in a secure environment variable.

4. **Deploy the Server-Side Code**:
    - You can use platforms like Replit, Heroku, or any other server hosting service to deploy the server-side code.

## Integration with Duda

1. **Add the Custom Widget to Your Duda Site**:
    - Create a new custom widget in your Duda site and add the HTML, CSS, and JavaScript provided in this project.

2. **Customize the Widget**:
    - Ensure the widget is correctly scoped by using the provided CSS.

3. **Test the Widget**:
    - Add the widget to a page and test the functionality to ensure everything works as expected.

## HTML Structure

```html
<div id="post-generator-widget">
    <h2>Social Media Post Generator</h2>
    <p>Please fill out the form below to generate a social media post. Provide details about the event, and optionally, shoutouts, hashtags, and vendor tags. This will help create a personalized and engaging post. The optimal length is 40-80 characters for Facebook and 138-150 characters for Instagram.</p>
    <form id="post-form">
        <label for="event-name">Event Name:</label>
        <input type="text" id="event-name" placeholder="e.g., Rochester Prep High School Prom" required>
        <label for="details">Event Details:</label>
        <textarea id="details" rows="4" placeholder="e.g., A night to remember with dancing, food, and fun" required></textarea>
        <label for="shoutouts">Shoutouts (optional):</label>
        <input type="text" id="shoutouts" placeholder="e.g., Special thanks to our amazing DJ">
        <label for="venue">Venue:</label>
        <input type="text" id="venue" placeholder="e.g., Harro East Ballroom" required>
        <label for="hashtags">Hashtags (optional):</label>
        <input type="text" id="hashtags" placeholder="e.g., #RochesterPrepProm #Prom2024">
        <label for="vendors">Vendors (optional):</label>
        <textarea id="vendors" rows="3" placeholder="e.g., Photographer, Catering, Rentals"></textarea>
        <label>
            <input type="checkbox" id="limit-length" checked>
            Keep post under recommended length for Facebook (40-80 characters) and Instagram (138-150 characters)
        </label>
        <button type="submit">Generate Posts</button>
        <button type="button" id="clear-form">Clear Form</button>
    </form>
    <div id="generated-posts" style="display: none;">
        <h3>Generated Posts:</h3>
        <div>
            <h4>Facebook Post</h4>
            <textarea id="facebook-post-content" rows="4"></textarea>
            <button id="copy-facebook-post">Copy Facebook Post</button>
        </div>
        <div>
            <h4>Instagram Post</h4>
            <textarea id="instagram-post-content" rows="4"></textarea>
            <button id="copy-instagram-post">Copy Instagram Post</button>
        </div>
        <button id="copy-both-posts">Copy Both Posts</button>
        <div id="refine-section" style="display: none;">
            <label for="refine-instructions">Refinement Instructions:</label>
            <textarea id="refine-instructions" rows="3" placeholder="e.g., Make it sound more exciting, Add a mention of the great food"></textarea>
            <button id="refine-button">Refine Posts</button>
        </div>
    </div>
    <p style="font-size: 12px; color: #888; text-align: center;">Powered by GPT-4o</p>
</div>

##CSS Structure

```css
/* Scoped Custom Widget CSS */
#post-generator-widget {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
    overflow: visible;
}

#post-generator-widget h2 {
    text-align: center;
    margin-top: 0;
}

#post-generator-widget form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

#post-generator-widget label {
    margin-top: 10px;
}

#post-generator-widget input[type="text"],
#post-generator-widget textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

#post-generator-widget input[type="checkbox"] {
    margin-right: 10px;
}

#post-generator-widget button {
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
}

#post-generator-widget button:hover {
    background-color: #0056b3;
}

#post-generator-widget #generated-posts {
    margin-top: 20px;
}

#post-generator-widget #generated-posts h3 {
    margin-bottom: 10px;
}

#post-generator-widget #generated-posts div {
    margin-bottom: 20px;
}

#post-generator-widget #generated-posts p {
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: pre-wrap;
}

#post-generator-widget #refine-section {
    margin-top: 20px;
}

#post-generator-widget #refine-section label {
    margin-top: 10px;
}

#post-generator-widget #refine-section textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

#post-generator-widget #refine-section button {
    margin-top: 10px;
}

#post-generator-widget button#copy-facebook-post,
#post-generator-widget button#copy-instagram-post {
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
}

#post-generator-widget button#copy-facebook-post:hover,
#post-generator-widget button#copy-instagram-post:hover {
    background-color: #218838;
}

#post-generator-widget p {
    margin: 0;
}

#post-generator-widget #post-content {
    margin-bottom: 20px;
}

@media (max-width: 600px) {
    #post-generator-widget {
        padding: 15px;
    }

    #post-generator-widget button {
        font-size: 14px;
    }
}
