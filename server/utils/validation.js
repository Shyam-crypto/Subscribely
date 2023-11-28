import { body, validationResult } from 'express-validator';

const validateRegistration = [
    //registration validation rules
    body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

const validateLogin =[
    // login validation Rules
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').not().isEmpty().withMessage('Password is required'),

];

export { validateRegistration, validateLogin};


