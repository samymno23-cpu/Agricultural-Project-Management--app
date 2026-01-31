const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public')); // تأكد أن اسم المجلد هو public

// رابط المزرعة الذكي
app.get('/farm/:farmId', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل على: http://localhost:${PORT}`);
});
