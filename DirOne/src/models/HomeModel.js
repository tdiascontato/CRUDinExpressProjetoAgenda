const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({// Esquema ou modelagem
    titulo: {type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home{
    
}
module.exports = Home;