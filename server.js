import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        }
    })

    res.status(201).json(res.body)

})
app.get('/usuarios', async (req, res) => {
    let users = []

    if (req.body) {
        users = await prisma.user.findMany({
            where: {
                    name: req.query.name,
                    email: req.query.email,
                    contact: req.query.contact
            },
        })
        } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)

})

    app.put('/usuarios/:id', async (req, res) => {

        await prisma.user.update({
        where: {
            id: req.params.id,
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
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({ message: 'Usuario deletado com sucesso!'})
})

app.listen(3000)

//  user: davipadilha
//  senha do banco de dados: lG3M27LxIrQ5U3zw