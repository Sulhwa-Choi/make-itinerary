const app = require("../app");
const logger = require("../src/config/logger");

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Itinerary Project ${port} 포트에서 서버 가동`);
});