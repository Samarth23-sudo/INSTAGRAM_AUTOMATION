# Instagram Automation Bot

## Project Overview

This project is an Instagram automation bot designed to post photos and stories on Instagram. The bot fetches image URLs and descriptions from a specified API, adds an overlay to the images, and publishes them to Instagram. It supports posting regular photos, stories, and a combination of both.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **Instagram Private API**: Library to interact with Instagram's private API.
- **Jimp**: Image processing library.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Request-Promise**: Simplified HTTP request library.

## Features

- **Fetch Data**: Retrieves image URLs and descriptions from a remote API.
- **Image Processing**: Adds an overlay to images and resizes them.
- **Post to Instagram**: Publishes photos and stories on Instagram.
- **Express Server**: Provides an endpoint to trigger the bot.

## Customization

- **Image URL Extraction**: The process of fetching image URLs from the remote API can be modified according to your specific requirements.
- **Image Resizing and Overlaying**: The resizing of images and the overlay can be customized based on different needs. Adjust the dimensions and overlay properties as necessary.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/Samarth23-sudo/Social_Media_Automation
    cd Social_Media_Automation
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory with the following content:
    ```
    IG_USERNAME=your_instagram_username
    IG_PASSWORD=your_instagram_password
    PORT=4000
    ```

4. **Run the Application**:
    ```sh
    npm start
    ```

## Usage

### Start the Express Server

To start the server, run:

```sh
npm start
