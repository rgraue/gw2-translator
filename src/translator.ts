import express from 'express';

const app = express();

const args = process.argv;

const PORT = args[2] || 8081
const TARGET = args[3] || 9000

app.post(/api/, (req, res) => {
    console.log(req);
    console.log(PORT);
    console.log(TARGET);
    res.send('hello');
});

app.listen(PORT, () => {
    console.log(`translator running on ${PORT}`)
});
