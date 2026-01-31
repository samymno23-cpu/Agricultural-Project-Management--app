// 1. تحديد أي مزرعة يتم عرضها من الرابط
const urlPath = window.location.pathname;
const farmIdFromUrl = urlPath.includes('/farm/') ? urlPath.split('/').pop() : 'عامة';

document.getElementById('farmTitle').innerText = decodeURIComponent(farmIdFromUrl);

// 2. إدارة البيانات (باستخدام الذاكرة المحلية مؤقتاً)
let activities = JSON.parse(localStorage.getItem(`activities_${farmIdFromUrl}`)) || [];

function updateView() {
    const list = document.getElementById('activitiesList');
    list.innerHTML = activities.map(act => `
        <div style="background:#e8f5e9; padding:10px; margin-bottom:5px; border-radius:5px;">
            <b>${act.type}</b> - ${act.date}
        </div>
    `).join('');
}

function addActivity() {
    const type = prompt("أدخل نوع النشاط (مثلاً: ري، تسميد، حصاد):");
    if (type) {
        activities.push({ type: type, date: new Date().toLocaleString('ar-EG') });
        localStorage.setItem(`activities_${farmIdFromUrl}`, JSON.stringify(activities));
        updateView();
    }
}

// تحديث الصفحة عند الفتح
updateView();
