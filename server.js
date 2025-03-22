import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        },
    });

    res.status(201).json({ message: 'Usuarios criado com sucesso', user})

});
app.get('/usuarios', async (req, res) => {
    let users;

    if (req.query.name || req.query.email || req.query.contact) {
        users = await prisma.user.findMany({
            where: {
                    name: req.query.name,
                    email: req.query.email,
                    contact: req.query.contact
            },
        });
        } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)

});

    app.put('/usuarios/:id', async (req, res) => {

        await prisma.user.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        }
    })

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await prisma.user.delete({
            where: {
                id
            },
        })
    
        res.status(200).json({ message: 'Usuario deletado com sucesso!'})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Erro ao deletar o usuário'})
    }
})

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta http://localhost:3000")
})

//  user: davipadilha
//  senha do banco de dados: lG3M27LxIrQ5U3zw