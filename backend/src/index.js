import { PORT } from "./config.js";
import app from "./app.js";

// Inicializar el servidor
app.listen(PORT, () => console.log(`Server funcionando en el puerto ${PORT}`));
