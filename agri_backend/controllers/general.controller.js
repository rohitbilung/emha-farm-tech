const data = require('../db.json')

module.exports = {
    getProducts : async (req, res) => {
        res.status(200).send({
        success: true,
        data: data.products,
        message: 'Request was successful',
      });
    },

    getTestimonials : async (req, res) => {
        res.status(200).send({
        success: true,
        data: data.testimonials,
        message: 'Request was successful',
      });
    }
}