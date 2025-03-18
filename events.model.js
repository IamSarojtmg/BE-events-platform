import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "enter product name"],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    tags: {
      type: String,
      required: true,
      trim: true,
    },

    urlFromChild: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  if (this.date) {
    const utcString = this.date.toISOString();
    const localDate = new Date(utcString);
    const offset = localDate.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, "0");
    const offsetMinutes = Math.abs(offset % 60)
      .toString()
      .padStart(2, "0");
    const sign = offset > 0 ? "-" : "+";

    const formattedDate = `${localDate
      .toISOString()
      .slice(0, 19)}${sign}${offsetHours}:${offsetMinutes}`;

    this.date = formattedDate;
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
