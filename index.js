const express = require("express");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

const PORT = 3000;

/*
    Documentação Swagger
    Tudo definido diretamente aqui no index.js
*/
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API Fake de Pagamentos",
        version: "1.0.0",
        description: "API de exemplo para simular endpoints de pagamentos. Os endpoints não executam pagamentos reais."
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Servidor local"
        }
    ],
    tags: [
        {
            name: "Pagamentos",
            description: "Endpoints fake para gerenciamento de pagamentos"
        }
    ],
    paths: {
        "/": {
            get: {
                summary: "Endpoint inicial da API",
                tags: ["Pagamentos"],
                responses: {
                    "200": {
                        description: "Mensagem de boas-vindas"
                    }
                }
            }
        },
        "/pagamentos": {
            get: {
                summary: "Listar pagamentos fake",
                tags: ["Pagamentos"],
                responses: {
                    "200": {
                        description: "Lista de pagamentos fake"
                    }
                }
            },
            post: {
                summary: "Criar pagamento fake",
                tags: ["Pagamentos"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cliente: {
                                        type: "string",
                                        example: "João da Silva"
                                    },
                                    valor: {
                                        type: "number",
                                        example: 150.75
                                    },
                                    formaPagamento: {
                                        type: "string",
                                        example: "cartao_credito"
                                    }
                                },
                                required: ["cliente", "valor", "formaPagamento"]
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Pagamento fake criado com sucesso"
                    },
                    "400": {
                        description: "Dados inválidos"
                    }
                }
            }
        },
        "/pagamentos/{id}": {
            get: {
                summary: "Consultar pagamento fake por ID",
                tags: ["Pagamentos"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        example: 1
                    }
                ],
                responses: {
                    "200": {
                        description: "Pagamento fake encontrado"
                    },
                    "404": {
                        description: "Pagamento fake não encontrado"
                    }
                }
            },
            put: {
                summary: "Atualizar pagamento fake",
                tags: ["Pagamentos"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cliente: {
                                        type: "string",
                                        example: "Maria Souza"
                                    },
                                    valor: {
                                        type: "number",
                                        example: 220.50
                                    },
                                    formaPagamento: {
                                        type: "string",
                                        example: "pix"
                                    },
                                    status: {
                                        type: "string",
                                        example: "aprovado"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Pagamento fake atualizado"
                    },
                    "404": {
                        description: "Pagamento fake não encontrado"
                    }
                }
            },
            delete: {
                summary: "Excluir pagamento fake",
                tags: ["Pagamentos"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        example: 1
                    }
                ],
                responses: {
                    "204": {
                        description: "Pagamento fake excluído"
                    },
                    "404": {
                        description: "Pagamento fake não encontrado"
                    }
                }
            }
        },
        "/pagamentos/{id}/aprovar": {
            post: {
                summary: "Aprovar pagamento fake",
                tags: ["Pagamentos"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        example: 1
                    }
                ],
                responses: {
                    "200": {
                        description: "Pagamento fake aprovado"
                    }
                }
            }
        },
        "/pagamentos/{id}/cancelar": {
            post: {
                summary: "Cancelar pagamento fake",
                tags: ["Pagamentos"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        example: 1
                    }
                ],
                responses: {
                    "200": {
                        description: "Pagamento fake cancelado"
                    }
                }
            }
        }
    }
};

/*
    Swagger UI
    Acesse em:
    http://localhost:3000/swagger
*/
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
    Endpoints fake
*/

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Fake de Pagamentos funcionando",
        swagger: `http://localhost:${PORT}/swagger`
    });
});

app.get("/pagamentos", (req, res) => {
    res.json([
        {
            id: 1,
            cliente: "João da Silva",
            valor: 150.75,
            formaPagamento: "cartao_credito",
            status: "pendente"
        },
        {
            id: 2,
            cliente: "Maria Souza",
            valor: 220.50,
            formaPagamento: "pix",
            status: "aprovado"
        },
        {
            id: 3,
            cliente: "Carlos Oliveira",
            valor: 89.90,
            formaPagamento: "boleto",
            status: "cancelado"
        }
    ]);
});

app.post("/pagamentos", (req, res) => {
    const pagamento = req.body;

    res.status(201).json({
        mensagem: "Pagamento fake criado com sucesso",
        pagamento: {
            id: Math.floor(Math.random() * 1000),
            cliente: pagamento.cliente,
            valor: pagamento.valor,
            formaPagamento: pagamento.formaPagamento,
            status: "pendente"
        }
    });
});

app.get("/pagamentos/:id", (req, res) => {
    const id = Number(req.params.id);

    res.json({
        id: id,
        cliente: "Cliente Fake",
        valor: 100.00,
        formaPagamento: "pix",
        status: "pendente"
    });
});

app.put("/pagamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const dados = req.body;

    res.json({
        mensagem: "Pagamento fake atualizado com sucesso",
        pagamento: {
            id: id,
            cliente: dados.cliente,
            valor: dados.valor,
            formaPagamento: dados.formaPagamento,
            status: dados.status
        }
    });
});

app.delete("/pagamentos/:id", (req, res) => {
    res.status(204).send();
});

app.post("/pagamentos/:id/aprovar", (req, res) => {
    const id = Number(req.params.id);

    res.json({
        mensagem: "Pagamento fake aprovado com sucesso",
        pagamento: {
            id: id,
            status: "aprovado"
        }
    });
});

app.post("/pagamentos/:id/cancelar", (req, res) => {
    const id = Number(req.params.id);

    res.json({
        mensagem: "Pagamento fake cancelado com sucesso",
        pagamento: {
            id: id,
            status: "cancelado"
        }
    });
});

app.listen(PORT, () => {
    console.log(`API Fake de Pagamentos rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/swagger`);
});