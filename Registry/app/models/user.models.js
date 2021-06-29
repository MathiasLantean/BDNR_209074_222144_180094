const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: String,
    privacy: {
        profile: Boolean
    },
    notification: {
        byEmail: Boolean
    },
    profile: {
        username: String,
        accountType: { type: String, enum: ['superadmin', 'admin', 'user'] },
        gender: { type: String, enum: ['man', 'woman', 'other'] },
        birthDate: Date,
        location: String,
        height: Number,
        weight: Number,
        equipment: { type: String, enum: ['bike', 'shoes', 'kettlebell'] },
        bibliography: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

// const childSchema = new Schema({ name: 'string' });

// const parentSchema = new Schema({
//   // Array of subdocuments
//   children: [childSchema],
//   // Single nested subdocuments. Caveat: single nested subdocs only work
//   // in mongoose >= 4.2.0
//   child: childSchema
// });

// {
//     Email
//     password
//     Profile {
//         username
//         accountType
//         gender
//         birthDate
//         location
//         height
//         weight
//         equipment
//         bibliography
//     }
//     Privacy {
//         profile
//     }
//     Notification{
//         email
//     }