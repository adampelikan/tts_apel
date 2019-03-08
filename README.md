# tts_apel
Simple local node.js TextToSpeech server providing a webservice. 
After receiving a GET request with the text string as parameter, it calls the google TTS webservice and downloads the MP3 with transformed audio and stores it on the hdd. Afterwards, the file with voice is played (using a player that actually works only on linux) so that the user can hear the voice from speakers. 
This tool is grat for home-automation projects - e.g. when it starts to rain and you have roof windows opened, some external logic (home automation platform) can send the HTTP get request to computer (e.g. raspberry pi) connected to home audio and using this tool user will get the audio notification about risk of wet floor under the roof windows.
