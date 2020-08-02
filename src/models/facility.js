const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    extra: {
      type: String,
    },
    address: {
      type: String,
    },
    blkHouse: {
      type: String,
      // required: true,
    },
    roadName: {
      type: String,
    },
    otherName: {
      type: String,
    },
    postalcode: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('Postal code must be a positive number');
        }
      },
    },
    sat: {
      type: String,
    },
    sun: {
      type: String,
    },
    weekday: {
      type: String,
    },
    cbclosed: {
      type: String,
    },
    ggwFlag: {
      type: String,
    },
    oprHrsMonday: {
      type: String,
    },
    oprHrsTuesday: {
      type: String,
    },
    oprHrsWednesday: {
      type: String,
    },
    oprHrsThurday: {
      type: String,
    },
    oprHrsFriday: {
      type: String,
    },
    oprHrsSaturday: {
      type: String,
    },
    oprHrsSundayPh: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

facilitySchema.virtual('crowdlevels', {
  ref: 'Crowdlevel',
  localField: 'id',
  foreignField: 'id',
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
