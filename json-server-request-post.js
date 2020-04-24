const axios = require('axios');

axios.post('http://localhost:3000/produtos',  {
  "nome":"Emilio",
  "descricao": "Emilio Vieira",
}).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});   