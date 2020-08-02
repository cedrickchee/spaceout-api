const mongoose = require('mongoose');

const crowdlevelSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      ref: 'Facility',
    },
    band: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    trend: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Crowdlevel = mongoose.model('Crowdlevel', crowdlevelSchema);

module.exports = Crowdlevel;
