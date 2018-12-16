const express = require('express');
const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient({
  projectId: 'seventh-fact-225623',
  keyFilename: 'g_auth/seventh-fact-225623-cfa3c13e9da3.json'
});

const { createAudio } = require('node-mp3-player')
const Audio = createAudio();

const app = express();

app.get('/TTS', function (req, res) {
		var text = req.param('string');
		//var text = 'test';
		  // Construct the request
		const request = {
		  input: {text: text},
		  // Select the language and SSML Voice Gender (optional)
		  voice: {languageCode: 'sk-SK', name: 'sk-SK-Wavenet-A'},
		  // Select the type of audio encoding
		  audioConfig: {audioEncoding: 'MP3'},
		};

		// Performs the Text-to-Speech request
		client.synthesizeSpeech(request, (err, response) => {
		  if (err) {
			console.error('ERROR:', err);
			return;
		  }

		  // Write the binary audio content to a local file
		  fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
			if (err) {
			  console.error('ERROR:', err);
			  return;
			}
			console.log('Audio content written to file: output.mp3');
		  });
		});

		(async () => {
		  await new Promise(done => setTimeout(done, 500));
		  const myFile = await Audio(`output.mp3`)
		  await myFile.volume(0.1)
		  await myFile.play()
		})()

		res.send('TTS output file generated');

})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
