import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Template } from "../models/Template";
import { AppException } from '../exceptions/AppException';

class TemplateController {

    public async index(request: Request, response: Response) {
       try {
         const repository = getRepository(Template);

            const projects = await repository.find()

            return response.json(projects);
       } catch (e) {
           const error = e as AppException;
           return response.status(error.code).json(error)
       } 
    }

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            const repository = getRepository(Template);

            const found = await repository.findOne(id);

            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            return response.json(found);
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     public async create(request: Request, response: Response) {
        try {

            const repository = getRepository(Template);

            const project = await repository.save(request.body);

            return response.status(201).json(project);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     public async update(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const novo = request.body;

            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            const repository = getRepository(Template);

            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Atualizo o projeto com os novos dados vindo do request body
            repository.update(found.id, novo);

            //Atualizo o ID do objeto novo
            novo.id = found.id;

            //Retorno o objeto atualizado
            return response.json(novo);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     public async remove(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            const repository = getRepository(Template);

            const found = await repository.findOne(id);

            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            repository.delete(found);

            return response.status(204).json();
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
     }
}

export default new TemplateController();