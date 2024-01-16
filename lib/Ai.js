const fetch = require('node-fetch'), axios = require('axios'), FormData = require('form-data'), fs = require('fs'), { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI('AIzaSyDR-Vh4DcRCWg2MVgPmXSh-mBZKzO-DSJw');

function aoi(Query) {
  return new Promise(async(resolve, reject) => {
    try {
    const formData = new FormData();
    formData.append("locale", 'id-ID');
    formData.append("content", `<voice name="ja-JP-AoiNeural">${Query}</voice>`);
    formData.append("ip", '38.46.219.162');
    const response = await fetch('https://app.micmonster.com/restapi/create', {
        method: 'POST',
        body: formData
    });
    resolve(Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64'));
        
  } catch (error) {
  resolve({creator: global.creator, status: false, mssg: 'error bang'})
}
  })
}

function botika(value) {
	return new Promise(async(resolve, reject) => {
	
  const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const currentTime = new Date();
  const webhookUrl = 'https://webhook.botika.online/webhook/';
  const payload = {
    app: {
      id: "blaael9y3cu1684390361270",
      time: currentTime,
      data: {
        sender: {
          id: randomId
        },
        message: [
          {
            id: randomId,
            time: currentTime,
            type: "text",
            value: value,
          }
        ]
      }
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8'
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const webhookResponse = await response.json();

    if (webhookResponse) {
      const messages = webhookResponse.app.data.message;

      if (Array.isArray(messages)) {
        const responseMessages = messages.map((message) => message.value);
        const message = responseMessages.join('\n\n').replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
        resolve({creator: global.creator, status: true, message})
      }
    } else {
      console.error('Webhook error:', webhookResponse.error);
      return null;
    }
    
  } catch (error) {
            resolve({creator: global.creator, status: false})

    return null;
  }
  })
};

async function blackbox(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post('https://www.useblackbox.io/chat-request-v4', {
                text: text,
                allMessages: [{
                    user: text
                }],
                stream: '',
                clickedContinue: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/71.3',
                }
            });
          let message = data.response[0][0]
          resolve({creator: global.creator, status: true, message});
        } catch (e) {
          resolve({creator: global.creator, status: false})
        }
    })
}

function remini(urlPath) {
  return new Promise(async (resolve, reject) => {
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/enhance";
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/enhance",
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data))
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}

    
function geminiAi(text) {
  return new Promise(async(resolve, reject) => {
  try {
    let model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let result = await model.generateContent(text);
    let response = await result.response;
    let hasil = response.text();
     resolve({creator: global.creator, status: true, hasil})
  } catch (e) {
    resolve(e)
  }
  })
}

function palm(text) {
  return new Promise(async(resolve, reject) => {
  try {
  const response = await axios.post('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDR-Vh4DcRCWg2MVgPmXSh-mBZKzO-DSJw', {
            prompt: {
                text: text
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

const result = response.data.candidates[0]
     resolve({creator: global.creator, status: true, result})
  } catch (e) {
    resolve(e)
  }
  })
}

exports.palm = palm
exports.geminiAi = geminiAi
exports.aoi = aoi
exports.remini = remini
exports.blackbox = blackbox
exports.botika = botika