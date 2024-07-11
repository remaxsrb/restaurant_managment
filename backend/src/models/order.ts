import mongoose, { Schema } from 'mongoose';

const Scheme = mongoose.Schema;

const estimated_delivery_time_windows = [
    [20, 30],
    [30, 40],
    [50, 60]
];

const EstimatedDeliveryTime = new Scheme({
    lower: {
        type: Number,
        required: true
    },
    upper: {
        type: Number,
        required: true
    }
});

const Order = new Scheme({

    guest: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    status: {
        type: String,
        required: true,
        enum:['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    estimated_delivery_time: {
        type: EstimatedDeliveryTime,
        // required: true, it is not required since it will be inserted once order is approved by waiter
        validate: {
            validator: function(value: any) {
              return estimated_delivery_time_windows.some(pair => pair[0] === value.first && pair[1] === value.second);
            },
        }
    }

    

})

export default mongoose.model('Order', Order, 'orders');