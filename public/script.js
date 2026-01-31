// الحصول على اسم المزرعة من الرابط (مثلاً: /farm/moghara-farm)
const urlPath = window.location.pathname;
const farmId = urlPath.split('/').pop() || 'default';

// عرض الاسم بشكل لائق (تحويل moghara-farm إلى مزرعة المغرة)
const farmDisplayName = farmId === 'moghara-farm' ? "مزرعة المغرة - الأستاذ محمد" : decodeURIComponent(farmId);
document.getElementById('farmTitle').innerText = farmDisplayName;

// وظيفة إضافة البيانات وحفظها لكل مزرعة بشكل مستقل
function addEntry(type) {
    const promptMsg = type === 'fertilizer' ? "أدخل تفاصيل التسميد أو الري:" : "أدخل اسم العامل:";
    const value = prompt(promptMsg);

    if (value) {
        const entry = {
            text: value,
            date: new Date().toLocaleString('ar-EG'),
        };

        // حفظ البيانات في مفتاح فريد لهذه المزرعة فقط
        let storageKey = `${type}_${farmId}`;
        let currentData = JSON.parse(localStorage.getItem(storageKey)) || [];
        currentData.push(entry);
        localStorage.setItem(storageKey, JSON.stringify(currentData));
        
        loadData(type);
    }
}

// عرض البيانات المخزنة
function loadData(type) {
    const container = document.getElementById(`${type}List`);
    const storageKey = `${type}_${farmId}`;
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    container.innerHTML = data.map(item => `
        <div style="background: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 8px; border-right: 4px solid #2e7d32;">
            <div style="font-weight: bold;">${item.text}</div>
            <div style="font-size: 12px; color: #666;">🕒 ${item.date}</div>
        </div>
    `).reverse().join('');
}

// تحميل البيانات عند فتح الصفحة
window.onload = () => {
    loadData('fertilizer');
    loadData('attendance');
};
