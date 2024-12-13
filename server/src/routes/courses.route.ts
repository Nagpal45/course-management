import {Router} from 'express';
import Course from '../models/Course';

const router = Router();

router.get('/', async (req, res) => {
    try{
        const courses = await Course.find({});
        res.status(200).json(courses);
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

export default router;
