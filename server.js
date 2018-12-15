const express = require('express');
const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();


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

})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});