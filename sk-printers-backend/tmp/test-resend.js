const { Resend } = require('resend');
require('dotenv').config({ path: 'c:\\Users\\mitta\\OneDrive\\Desktop\\sk-printers-website\\sk-printers-backend\\.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
    console.log('Testing Resend API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    try {
        // We'll just try to list domains or something simple that doesn't send an email
        // but verifies the API key is valid.
        const { data, error } = await resend.domains.list();
        if (error) {
            console.error('❌ Resend API Error:', error);
        } else {
            console.log('✅ Resend API Key is WORKING! Domains:', data);
        }
    } catch (err) {
        console.error('❌ Resend Test Failed:', err.message);
    }
}

testResend();
