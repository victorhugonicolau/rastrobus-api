import express from 'express';
import multer from 'multer';
import { Ponto } from '../model/ponto.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /ponto:
 *   get:
 *     summary: Consulta a lista de pontos disponíveis
 *     tags: [Pontos]
 *     responses:
 *       200:
 *         description: Retorna a lista de pontos
 *       500:
 *         description: Erro na consulta de pontos
 */
router.get('/', async (req, res) => {
    try {
        const pontos = await Ponto.findAll({
            attributes: [
                "id",
                "numero",
                "cor",
                "endereco",
                "bairro",
                "latitude",
                "longitude",
            ]
        });
        res.json(pontos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ponto = await Ponto.findByPk(req.params.id);
        res.json(ponto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /ponto:
 *   post:
 *     summary: Cria um novo ponto
 *     tags: [Pontos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - cor
 *               - bairro
 *               - latitude
 *               - longitude
 *               - imagem 
 *             properties:
 *               numero:
 *                 type: int
 *               cor:
 *                 type: string
 *                 enum: [verde, vermelha, azul]
 *               endereco:
 *                 type: string
 *               bairro:
 *                 type: string
 *               latitude:
 *                 type: decimal
 *               longitude:
 *                 type: decimal
 *               imagem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/', async (req, res) => {
    try {
        const ponto = await Ponto.create(req.body);
        res.status(201).json(ponto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', upload.single("imagem"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    try {
        const ponto = await Ponto.findByPk(req.params.id);
        const imagem = req.file.buffer.toString('base64');

        await Ponto.update(
            {
                imagem: imagem
            },
            {
                where: {
                    id: ponto.id
                }
            }
        );

        res.status(200).send('Imagem salva com sucesso!');
    } catch (error) {        
        res.status(500).send('Erro ao salvar a imagem.');        
    }
});

export default router;
