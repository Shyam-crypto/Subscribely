import { body } from 'express-validator';

const validIntervals = ['weekly','monthly','annualy'];
const validateCreateProduct = [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('intervals')
    .notEmpty().withMessage('Intervals are required')
    .isIn(validIntervals).withMessage('invalid interval value'),
    /*(req, res, next) => {
      if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'Image is required' });
      }
      next();
    }*/
  ];

const validateUpdateProduct = [
  body('name')
    .optional()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('Name must be a string'),
  body('description')
    .optional()
    .notEmpty().withMessage('description is required')
    .isString().withMessage('description must be string'),
  body('price')
    .optional()
    .notEmpty().withMessage('price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('intervals')
    .optional()
    .notEmpty().withMessage('Intervals are required')
    .isIn(validIntervals).withMessage('invalid interval value'),
    
];

export { validateCreateProduct, validateUpdateProduct };
