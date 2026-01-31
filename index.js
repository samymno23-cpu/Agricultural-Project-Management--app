const express = require('express');
const app = express();
const path = require('path');

// --- 1. الإعدادات الأساسية (لا تلمسها لضمان عمل ما سبق) ---
app.use(express.json());
app.use(express.static('public')); // لخدمة ملفات الـ HTML والصور

// --- 2. ميزة الروابط الديناميكية للمزارع (الإضافة الجديدة) ---
// هذا الرابط سيعمل لكل مزرعة بشكل مستقل: app.com/farm/sufyan-01
app.get('/farm/:farmId', (req, res) => {
    const farmId = req.params.farmId;
    
    // هنا نقوم بإرسال ملف الواجهة الرئيسي للعميل
    // الميزة البرمجية السابقة ستظل تعمل، لكنها ستعرض بيانات هذه المزرعة فقط
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// --- 3. ميزة جلب البيانات المخصصة (API) ---
// هذا الجزء يضمن أن المهام والمخازن تظهر حسب المزرعة المحددة
app.get('/api/data/:farmId', (req, res) => {
    const farmId = req.params.farmId;
    
    // ملاحظة تقنية: هنا يتم استدعاء قاعدة البيانات (Firebase/MongoDB) 
    // وجلب (المهام، الحضور، والمخزون) المرتبط بـ farmId فقط
    console.log(`طلب بيانات للمزرعة: ${farmId}`);
    
    // مثال لاستجابة البيانات دون تغيير المنطق القديم
    res.json({
        message: `بيانات المزرعة ${farmId} جاهزة`,
        farmId: farmId,
        tasks: [] // المهام التي اتفقت عليها سابقاً ستظهر هنا
    });
});

// --- 4. تشغيل السيرفر على المنفذ 3000 كما هو موضح في مشروعك ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل الآن على: http://localhost:${PORT}`);
    console.log(`يمكنك تجربة رابط المزرعة: http://localhost:${PORT}/farm/alsufyan-olive-01`);
});
