import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createSuperuser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const superuser = new User({
      name: 'Super User',
      email: 'choudharyu2003@gmail.com',
      password: '/;p0okMJU7YGVFR4ESZ'
    });

    await superuser.save();
    console.log('Superuser created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating superuser:', error);
    process.exit(1);
  }
};

createSuperuser();