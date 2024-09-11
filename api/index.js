import express from 'express';



const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port number ${process.env.PORT}`);
});