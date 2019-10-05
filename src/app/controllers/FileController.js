// Modelo
// Arquivos
import Files from '../models/Files';

class FileController {
    async store(req, res) {
        // Valores do arquivo enviado
        const { originalname: name, filename: path } = req.file;
        // Criando informações no db
        const file = await Files.create({ name, path });

        return res.json(file);
    }
}

export default new FileController();
