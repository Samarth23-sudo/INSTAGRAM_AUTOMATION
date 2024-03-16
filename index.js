require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const Jimp = require('jimp');
// const fs = require('fs').promises;
const { get } = require('request-promise');
// const CronJob = require("cron").CronJob;
const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const express = require('express')

const app = express()
const port = process.env.PORT || 4000;


app.get('/get-info', async (req, res) => {
    try {
        // Call the get_info function
        fetch('https://flask-heroku-server-3.onrender.com/')
        await get_info();
        res.status(200).send({ message: 'get_info function executed successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while executing get_info function' });
    }
});

var imageUrl
var description
var width
var height
var is_valid_return=1
function get_info()
{
    fetch('https://flask-heroku-server-3.onrender.com/post')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        if (data && data.error === 'Document not found') {
            console.log("yed")
            is_valid_return=-1; // Return -1 if the error indicates document not found
            console.log(is_valid_return)
        }
        else if(data.platform == 1 || data.platform == 3)
        {
        imageUrl = data.image_url
        description = data.description
        width = data.width
        height = data.height;
        postToInsta();
        }
    })
    .catch(error => {
    console.error('Error:', error);
    return -1;
    }); 
}

const postToInsta = async () => {

    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  
    const image = await Jimp.read({
        url: imageUrl
    });
    console.log('Login Successful.');
    
    await image.resize(width,height, Jimp.RESIZE_NEAREST_NEIGHBOR)
           .quality(100)
  
    const resizedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const imageBuffer = resizedImageBuffer
    await ig.publish.photo({
        file: imageBuffer,
        caption: description,
    });
    console.log('Posted successfully.');    
}

const addStoryToInsta = async () => {
    try{
        
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const image = await Jimp.read({
        url: imageUrl
    });
    console.log('Login Successful.');
    
    await image.resize(width,height, Jimp.RESIZE_NEAREST_NEIGHBOR)
           .quality(100)
    
    const resizedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const imageBuffer = resizedImageBuffer

    await ig.publish.story({
        file: imageBuffer,
        caption: "ClubArtizen",        
    });

    console.log('story uploaded successfully.');
    }catch (error) {
        console.error('Error occurred while publishing the story:', error);
    }
};

// const cronInsta = new CronJob("18 15 * * *", async () => {
//                                          //post story every day at 9 am
// });

//cronInsta.start();
// get_info();
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})