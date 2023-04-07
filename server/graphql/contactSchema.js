const models = require('../models');

const { Op } = require('sequelize');
const { buildSchema } = require('graphql');
const { Response } = require('../helpers/util');

var schema = buildSchema(`
    input ContactInput {
        name: String
        phone: String
    }
    
    type Contact {
        id: ID
        name: String
        phone: String
    }

    type Value {
        contact: [Contact]
        totalPage: Int
        page: Int
    }
    
    type Response {
        data: Value
        success: Boolean
    }
  
    type Query {
        getAllContacts(name: String, phone: String, page: Int, totalPage: Int): Response
        getContact(id: ID!): Contact  
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(id: ID!): Contact
    }
`);

var root = {
    getAllContacts: async ({ name, phone, page = 1, totalPage }) => {
        try {
            const limit = 9
            const offset = (page - 1) * limit

            if (name && phone) {
                const { count, rows } = await models.User.findAndCountAll({
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `%${name}%`
                                }
                            },
                            {
                                phone: {
                                    [Op.iLike]: `%${phone}%`
                                }
                            }
                        ]
                    },

                    limit: limit,
                    offset: offset
                })

                totalPage = Math.ceil(count / limit)
                return new Response({ contact: rows, totalPage, page })

            } else if (name) {
                const { count, rows } = await models.User.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${name}%`
                        }
                    },
                    limit: limit,
                    offset: offset
                })

                totalPage = Math.ceil(count / limit)
                return new Response({ contact: rows, totalPage, page })

            } else if (phone) {
                const { count, rows } = await models.User.findAndCountAll({
                    where: {
                        phone: {
                            [Op.iLike]: `%${phone}%`
                        }
                    },
                    limit: limit,
                    offset: offset
                })

                totalPage = Math.ceil(count / limit)
                return new Response({ contact: rows, totalPage, page })

            } else {
                const { count, rows } = await models.User.findAndCountAll({
                    limit: limit,
                    offset: offset,
                    order: [
                        ["id", "ASC"]
                    ]
                })

                totalPage = Math.ceil(count / limit)
                return new Response({ contact: rows, totalPage, page })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(new Response(error, false))
        }
    },

    getContact: async ({ id }) => {
        return await models.User.findOne({
            where: {
                id: id
            }
        })
    },

    createContact: async ({ input }) => {
        return await models.User.create(input)
    },

    updateContact: async ({ id, input }) => {
        return await models.User.update(input, {
            where: {
                id: id
            },
            returning: true,
            plain: true
        })
        return update[1]
    },

    deleteContact: async ({ id }) => {
        return await models.User.destroy({
            where: {
                id: id
            }
        })
        return deleteContact
    }
}

module.exports = { schema, root }