import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaRuler, FaPalette, FaCalculator } from 'react-icons/fa';

export default function PriceCalculator() {
  const [formData, setFormData] = useState({
    boxType: '3-ply',
    length: 12,
    width: 10,
    height: 8,
    quantity: 500,
    printing: 'no',
    colors: 1,
  });

  const [price, setPrice] = useState(0);

  // Price calculation logic
  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const calculatePrice = () => {
    const baseRates = {
      '3-ply': 15,
      '5-ply': 25,
      '7-ply': 40,
    };

    // Base price per box
    let basePrice = baseRates[formData.boxType];

    // Size factor (volume in cubic inches / 100)
    const volume = (formData.length * formData.width * formData.height) / 100;
    const sizeMultiplier = 1 + (volume * 0.02);

    // Quantity discount
    let quantityDiscount = 1;
    if (formData.quantity >= 1000) quantityDiscount = 0.85;
    else if (formData.quantity >= 500) quantityDiscount = 0.90;
    else if (formData.quantity >= 100) quantityDiscount = 0.95;

    // Printing cost
    let printingCost = 0;
    if (formData.printing === 'yes') {
      printingCost = 5 + (formData.colors * 2);
    }

    // Calculate final price
    const pricePerBox = (basePrice * sizeMultiplier + printingCost) * quantityDiscount;
    const totalPrice = pricePerBox * formData.quantity;

    setPrice(totalPrice.toFixed(2));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to backend or email
    alert(`Quote Request Submitted!\nEstimated Price: ₹${price}\n\nWe'll contact you shortly with final quote.`);
  };

  return (
    <section id="calculator" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <FaCalculator className="inline mr-3 text-primary-600" />
            Instant Price Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate for your custom cardboard box order
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Box Type */}
              <div>
                <label className="label">
                  <FaBox className="inline mr-2 text-primary-600" />
                  Box Type
                </label>
                <select
                  name="boxType"
                  value={formData.boxType}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="3-ply">3-Ply Corrugated</option>
                  <option value="5-ply">5-Ply Corrugated</option>
                  <option value="7-ply">7-Ply Corrugated</option>
                </select>
              </div>

              {/* Dimensions */}
              <div>
                <label className="label">
                  <FaRuler className="inline mr-2 text-primary-600" />
                  Dimensions (inches)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="Length"
                      min="1"
                      max="100"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">Length</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleChange}
                      placeholder="Width"
                      min="1"
                      max="100"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">Width</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Height"
                      min="1"
                      max="100"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">Height</p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="label">
                  Quantity
                  {formData.quantity >= 500 && (
                    <span className="ml-2 text-xs text-green-600 font-normal">
                      (Bulk discount applied!)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="100"
                  step="50"
                  className="input-field"
                />
                <input
                  type="range"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="100"
                  max="5000"
                  step="50"
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>5,000</span>
                </div>
              </div>

              {/* Printing */}
              <div>
                <label className="label">
                  <FaPalette className="inline mr-2 text-primary-600" />
                  Custom Printing Required?
                </label>
                <select
                  name="printing"
                  value={formData.printing}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="no">No Printing</option>
                  <option value="yes">Yes, Custom Printing</option>
                </select>
              </div>

              {/* Number of Colors */}
              {formData.printing === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="label">Number of Colors</label>
                  <select
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="1">1 Color</option>
                    <option value="2">2 Colors</option>
                    <option value="3">3 Colors</option>
                    <option value="4">4 Colors (Full Color)</option>
                  </select>
                </motion.div>
              )}

              <button type="submit" className="btn btn-primary w-full text-lg">
                Request Detailed Quote
              </button>
            </form>
          </motion.div>

          {/* Price Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <div className="text-center mb-6">
                <p className="text-lg mb-2">Estimated Total Price</p>
                <motion.div
                  key={price}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black mb-2"
                >
                  ₹{price.toLocaleString()}
                </motion.div>
                <p className="text-sm opacity-90">
                  Price per box: ₹{(price / formData.quantity).toFixed(2)}
                </p>
              </div>

              <div className="border-t border-white/20 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Base unit cost:</span>
                  <span className="font-semibold">₹{formData.boxType === '3-ply' ? '15' : formData.boxType === '5-ply' ? '25' : '40'}/unit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Quantity discount:</span>
                  <span className="font-semibold text-green-300">
                    {formData.quantity >= 1000 ? '15%' : formData.quantity >= 500 ? '10%' : formData.quantity >= 100 ? '5%' : '0%'}
                  </span>
                </div>
                {formData.printing === 'yes' && (
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Printing ({formData.colors} color{formData.colors > 1 ? 's' : ''}):</span>
                    <span className="font-semibold">+₹{5 + (formData.colors * 2)}/unit</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Delivery:</span>
                  <span className="font-semibold text-green-300">FREE</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm mb-2 font-semibold">✓ What's Included:</p>
                <ul className="text-xs space-y-1 opacity-90">
                  <li>✓ Free design consultation</li>
                  <li>✓ Quality testing & samples</li>
                  <li>✓ 48-hour delivery guarantee</li>
                  <li>✓ 100% quality assurance</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>💡 <strong>Pro Tip:</strong> Order 500+ units for maximum savings!</p>
              <p className="mt-2">📞 Need help? Call us at <a href="tel:+919876543210" className="text-primary-600 font-semibold">+91 98765-43210</a></p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
