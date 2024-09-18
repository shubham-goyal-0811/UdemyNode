const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Alias for top 5 cheap tours
router.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.Getalltours);

// Tour statistics
router.route('/tour-stats')
    .get(tourController.getTourStates);

// Monthly plan for tours
router.route('/monthly-plan/:year')
    .get(tourController.getMonthlyPlans);

// Basic CRUD operations for tours
router.route('/')
    .get(tourController.Getalltours)
    .post(tourController.createTour);

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
