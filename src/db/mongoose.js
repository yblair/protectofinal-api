const mongoose = require('mongoose');
const uri = "mongodb+srv://belulair:ideapad@cluster0.ctaui.mongodb.net/productossf?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


