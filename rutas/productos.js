const express = require('express');
const router = express.Router();

const data = [
  {id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date()},
  {id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date()},
  {id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date()},
  {id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date()},
  {id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date()},
];

router.get('/', function (req, res) {
  res.status(200).json(data);
});

router.get('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    //TODO: Retornar los valores de la variable found
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', function (req, res) {
  let itemIds = data.map(item => item.id);
  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
  let newItem = {
    id:newId,
    nombre:req.body.nombre,
    valor: req.body.valor,
    enStock: false,
    createdOn: new Date()
  }//TODO: Completar con nuevo producto 

  data.push(newItem);

  res.status(201).json(newItem);
});

router.put('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let updated = {
    id: found.id,
    nombre:req.body.nombre,
    valor: req.body.valor,
    enStock: req.body.enStock,
  }

    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1, updated);
    res.sendStatus(204)
    //TODO: Retornar status 204
  } else {
    res.sendStatus(500)
      //TODO: Retornar status 204
  }
});

router.delete('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
  }
  res.sendStatus(204)
  //TODO: Retornar status 204
});
module.exports = router;