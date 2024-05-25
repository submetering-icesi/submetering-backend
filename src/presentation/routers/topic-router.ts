import { ICommonUseCases } from "../../application/use-cases/common";
import { Topic } from "../../domain/entities/Topic";
import express from "express";

export default function TopicRouter(topicRepository: ICommonUseCases<Topic>) {
    const router = express.Router();

    router.get('/get/all', async (req, res) => {
        const topics = await topicRepository.getAll();
        res.status(200).json(topics);
    });

    router.get('/get/:name', async (req, res) => {
        const topic = await topicRepository.getOne({ name: req.params.name });
        res.status(200).json(topic);
    });

    router.post('/add', async (req, res) => {
        const topic = await topicRepository.add(req.body);
        res.status(200).json(topic);
    });

    router.delete('/delete/:name', async (req, res) => {
        const topic = await topicRepository.getOne({ name: req.params.name });
        await topicRepository.delete({ name: req.params.name });
        res.status(200).json(topic);
    });

    return router;
}