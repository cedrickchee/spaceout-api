const express = require('express');
const Crowdlevel = require('../models/crowdlevel');
const auth = require('../middleware/auth');

const router = new express.Router();

// GET /crowdlevels
// GET /crowdlevels?start=2020-07-25&end=2020-07-31
// GET /crowdlevels?start=2020-07-25
// GET /crowdlevels?end=2020-07-31
router.get('/crowdlevels', auth, async (req, res) => {
  let createdAt = {};
  let pipeline;

  if (!req.query.start && !req.query.end) {
    // Filters are empty.

    // So, return the latest data point for each facility.
    pipeline = [
      { $sort: { createdAt: 1, updatedAt: 1 } },
      { $group: { _id: '$id', doc: { $last: '$$ROOT' } } },
      {
        $replaceRoot: { newRoot: { $mergeObjects: '$doc' } },
      },
      {
        $lookup: {
          from: 'facilities',
          localField: 'id',
          foreignField: 'id',
          as: 'fromFacilities',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromFacilities', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { fromFacilities: 0, _id: 0, __v: 0 } },
    ];
  } else {
    // Filters are not empty.

    if (req.query.start && req.query.end) {
      // Return the average crowd band for each facility between the start date and
      // end date of the given date range.
      const startDate = req.query.start.trim();
      const endDate = req.query.end.trim();

      createdAt = {
        $gte: new Date(startDate), // '2020-07-25T00:00:00.000Z'
        $lte: new Date(endDate), // '2020-07-31T06:30:00.000Z'
      };
    } else if (req.query.start) {
      // Return the average crowd band for each facility
      // greater than and equal the start date.
      const startDate = req.query.start.trim();

      createdAt = {
        $gte: new Date(startDate), // '2020-07-25T00:00:00.000Z'
      };
    } else if (req.query.end) {
      // Return the average crowd band for each facility
      // lower than and equal the end date.
      const endDate = req.query.end.trim();

      createdAt = {
        $lte: new Date(endDate), // '2020-07-31T06:30:00.000Z'
      };
    }

    pipeline = [
      {
        $match: {
          createdAt,
        },
      },
      {
        $group: {
          _id: '$id',
          total: { $sum: '$band' },
          average: { $avg: '$band' },
        },
      },
      {
        $lookup: {
          from: 'facilities',
          localField: '_id',
          foreignField: 'id',
          as: 'fromFacilities',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromFacilities', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $project: {
          fromFacilities: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ];
  }

  try {
    const crowdlevels = await Crowdlevel.aggregate(pipeline);

    if (!crowdlevels) {
      return res.status(404).send();
    }

    res.send(crowdlevels);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
