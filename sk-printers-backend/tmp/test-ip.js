const { restrictToIp } = require('../server/middleware/auth');
require('dotenv').config({ path: 'c:\\Users\\mitta\\OneDrive\\Desktop\\sk-printers-website\\sk-printers-backend\\.env.local' });

// Mock Express req, res, next
const req = {
    headers: {},
    socket: { remoteAddress: '127.0.0.1' }, // Default local IP
    ip: '127.0.0.1'
};

const res = {
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        this.jsonData = data;
        return this;
    }
};

const next = () => {
    console.log('✅ Access GRANTED by middleware');
};

console.log('Testing IP Whitelisting...');
console.log('Environment ALLOWED_ADMIN_IP:', process.env.ALLOWED_ADMIN_IP);

// Test case 1: No configuration (should log warning but allow)
process.env.ALLOWED_ADMIN_IP = 'your-laptop-ip-here';
console.log('\nTest Case 1: Unconfigured/Default');
restrictToIp(req, res, next);

// Test case 2: Blocked IP
process.env.ALLOWED_ADMIN_IP = '1.1.1.1';
req.headers['x-forwarded-for'] = '2.2.2.2';
console.log('\nTest Case 2: Different IP (Blocked)');
restrictToIp(req, res, next);
if (res.statusCode === 403) {
    console.log('🚫 Correctly blocked access! Message:', res.jsonData.message);
}

// Test case 3: Allowed IP
process.env.ALLOWED_ADMIN_IP = '2.2.2.2';
req.headers['x-forwarded-for'] = '2.2.2.2';
console.log('\nTest Case 3: Matching IP (Allowed)');
restrictToIp(req, res, next);
