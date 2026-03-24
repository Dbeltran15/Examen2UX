const { Autores } = require('../models');

const getAuthors = async (req, res) => 
{
    try {
    let autores = await Autores.findAll();
        if (autores.length <= 0) {
            return res.status(204).json({
                message: "No se encontraron autores"
            });
        }
    res.json({
                 message: "Autores solicitados exitosamente",
      count: autores.length,
      data: autores
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error.message
    });
  }
};

const createAuthor = async (req, res) => {
  try {
    let {
        id,
        Name,
        Stack,
    } = req.body || {}; 
        
    const created = await Autores.create({
        id,
        Name,
        Stack,
    });

    res
      .status(201)
      .location(`/dbTest/${created.id || created.username || created.FirstName}-${created.LastName}`)
      .json({
        message: 'Autor creado exitosamente',
        data: created
      });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getAuthors,
  createAuthor
};