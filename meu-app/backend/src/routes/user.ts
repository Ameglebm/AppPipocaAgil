// Define os endpoints da API e mapeia URLs para os controladores.
import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"
import { cpf } from "cpf-cnpj-validator";


export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/:id', async (request) => {

    const getUserParams = z.object({
      id: z.string().transform((val) => parseInt(val)), 
    })

   
    const { id } = getUserParams.parse(request.params)

    const userData = await prisma.users.findUnique({
      where: {
        id
      }
    })

    return { userData }
  })

  fastify.post('/users', async (request) => {
    const createUserBody = z.object({
      nome: z.string(),
      sobrenome: z.string(),
      email: z.string().email(),
      cpf_number: z.string(),
      senha: z.string().min(8) 
    }).superRefine((data, ctx) => {
      if (!cpf.isValid(data.cpf_number)) {
        ctx.addIssue({
          path: ['cpf'],
          message: "CPF inválido",
          code: z.ZodIssueCode.custom,
        });
      }
    });

    const { nome, sobrenome, email, cpf_number, senha  } = createUserBody.parse(request.body)

    await prisma.users.create({
      data: { 
        nome,    
        sobrenome,
        email,
        cpf: cpf_number,       
        senha,    
      }
    })
  })

  fastify.delete('/users/:id', async (request) => {

    const getUserParams = z.object({
      id: z.string().transform((val) => parseInt(val)), 
    })

    const { id } = getUserParams.parse(request.params)

    await prisma.users.delete({
      where: {
        id
      }
    })
  })
}