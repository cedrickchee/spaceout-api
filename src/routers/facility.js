const express = require('express');
const Facility = require('../models/facility');
const auth = require('../middleware/auth');

const router = new express.Router();

// GET /tasks?limit=10&skip=10
// GET /tasks?type=supermarket&postalcode=521107
router.get('/facilities', auth, async (req, res) => {
  const match = {};

  if (req.query.type) {
    match.type = req.query.type.trim().toUpperCase();
  }
  if (req.query.postalcode) {
    match.postalcode = parseInt(req.query.postalcode.trim(), 10);
  }

  try {
    const facilities = await Facility.find({ ...match })
      .limit(parseInt(req.query.limit, 10))
      .skip(parseInt(req.query.skip, 10));

    if (!facilities) {
      return res.status(404).send();
    }

    res.send(facilities);
  } catch (e) {
    res.status(500).send();
  }
});

// GET /facilities/82246e9b
router.get('/facilities/:id', auth, async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Facility.findOne({ id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
