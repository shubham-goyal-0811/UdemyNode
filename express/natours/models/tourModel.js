const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour must have a name'],
        unique: true,
        trim:true,
        maxlength: [40, 'A tour name must have less than or equal then 40 characters'],
        minlength: [5, 'A tour name must have less than or equal then 5 characters'],
        // validate: [validator.isAlpha, 'Tour name must only contains Characters'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Tour must have a Group Size']
    },
    difficulty: {
        type: String,
        required: [true, 'Tour must have a Difficulty Level'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: "Difficulty can be 'easy','medium' or 'difficult'"
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4,
        min: [1,"Rating must be above 0"],
        max: [5,"Rating must me below 5"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate:{
            validator: function(val){
                return val < this.price;
            },
            message: 'A tour cannot have a discount price equal or more than its price',
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

tourSchema.virtual('durationWeeks').get(function(){//no arrow func because we need 'this' keyword.
    return this.duration/7;
});

//document middleware: runs before .save() and .create() only
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower : true });
    next();
});

// tourSchema.pre('save', function(next){

//     next();
// });

// tourSchema.post('save', function(doc,next){

//     next();
// });


//Query Middleware: runs before or after a certain query
tourSchema.pre(/^find/, function(next){
    this.find({ secretTour: {$ne: true}});

    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(doc,next){
    console.log(`Query took ${Date.now() - this.start}`);
    next();
});

//Aggregation Middleware
tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}});
    console.log(this.pipeline());
    next();
});
const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;