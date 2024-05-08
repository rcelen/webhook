import express from 'express';
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = 80;
app.use(express.json());
// dit is geen Github secret
// deze code runt normaal op een andere machine dan de workflow
const VALID_SECRET = process.env.SECRET_TOKEN;

app.post('/webhook', (req, res) => {
    const auth_header = req.headers.authorization;
    if (auth_header && auth_header.startsWith("Bearer ")) {
        const token = auth_header.substring(7);
        console.log(token === VALID_SECRET)
        if (token) {
            console.log('Received valid webhook:');
            res.status(200).send('Webhook processed successfully!');
        } else {
            console.log("invalid webhook")
            res.status(403).send("invalid secret")
        }
    }
    else {
        console.log("no secret")
        res.status(403).send("no secret")
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
