import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const args = process.argv;

const PORT = args[2] || 8081
const TARGET = args[3] || 9000

export const sendToLocalDockerLambda = async (payload: any) => {
    const result = await axios.post(`http://localhost:${TARGET}/2015-03-31/functions/function/invocations`, payload);

    return await result.data;
}


app.post(/api/, async (req, res, next) => {

    const {headers, body, url} = req;
    console.log(`POST::${url}`);

    const translated = {
        body,
        headers,
        requestContext: {
            http: {
                method: 'POST',
                path: url
            }
        }
    }

    const result = await sendToLocalDockerLambda(translated);

    res.send(result);
});

app.put(/api/, async (req, res, next) => {
    const {headers, body, url} = req;
    console.log(`PUT::${url}`);

    const translated = {
        body,
        headers,
        requestContext: {
            http: {
                method: 'PUT',
                path: url
            }
        }
    }

    const result = await sendToLocalDockerLambda(translated);

    res.send(result);
})

app.get(/api/, async (req, res, next) => {
    const {headers, url} = req;
    console.log(`GET::${url}`);

    const translated = {
        headers,
        requestContext: {
            http: {
                method: 'GET',
                path: url
            }
        }
    }

    const result = await sendToLocalDockerLambda(translated);

    res.send(result);
});

app.delete(/api/, async (req, res, next) => {
    const {headers, url} = req;
    console.log(`DELETE::${url}`);

    const translated = {
        headers,
        requestContext: {
            http: {
                method: 'DELETE',
                path: url
            }
        }
    }

    const result = await sendToLocalDockerLambda(translated);

    res.send(result);
});

app.listen(PORT, () => {
    console.log(`translator running on ${PORT}`)
});
