import * as express from "express";
import * as cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);
app.use(express.json());

const port = 4500;
app.listen(port, () => {
  console.log(`Extractor server listen on port ${port}`);
});
