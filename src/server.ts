import app from "./app";
import { ENV } from "./config/env";

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
