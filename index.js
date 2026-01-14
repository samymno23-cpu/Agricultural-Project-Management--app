const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>farm-management-app</h1><p>Minimal Express scaffold is running.</p>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// 1. استرجاع البيانات المخزنة فور تحميل الصفحة
let farmsData = JSON.parse(localStorage.getItem('agri_projects_data')) || [];

function updateUI() {
    const grid = document.getElementById('farmsGrid');
    grid.innerHTML = ''; // تفريغ العرض الحالي دون مسح البيانات من الذاكرة

    farmsData.forEach((farm, index) => {
        const card = document.createElement('div');
        card.className = 'farm-card';
        card.innerHTML = `
            <div style="background: white; border-radius: 15px; padding: 20px; border-left: 5px solid #27ae60; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <h3>📍 ${farm.name}</h3>
                <p>تاريخ الإضافة: ${farm.date}</p>
                <button onclick="deleteFarm(${index})" style="color: red; background: none; border: none; cursor: pointer;">حذف المزرعة</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 2. وظيفة إضافة مزرعة جديدة (تحديث دون مسح القديم)
function addNewFarm() {
    const name = prompt("أدخل اسم المزرعة أو المشروع:");
    if (name) {
        const newEntry = {
            id: Date.now(),
            name: name,
            date: new Date().toLocaleDateString('ar-EG'),
            details: {} 
        };
        
        // إضافة للمصفوفة الحالية
        farmsData.push(newEntry);
        
        // حفظ في الذاكرة لضمان عدم الضياع عند التحديث
        localStorage.setItem('agri_projects_data', JSON.stringify(farmsData));
        
        updateUI();
        alert("تمت إضافة المزرعة وحفظ البيانات بنجاح ✅");
    }
}

// تشغيل العرض الأولي
updateUI();
