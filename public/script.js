// 1. تحديد بيانات المزرعة من الرابط
const urlPath = window.location.pathname;
const farmId = urlPath.split('/').pop() || 'default';
const farmDisplayName = (farmId === 'moghara-farm' || farmId === 'moghara') 
    ? "مزرعة المغرة - الأستاذ محمد" 
    : decodeURIComponent(farmId);

document.getElementById('farmTitle').innerText = farmDisplayName;

// 2. وظيفة إضافة البيانات
function addEntry(type) {
    const msg = type === 'fertilizer' ? "تفاصيل التسميد/الري:" : "اسم العامل:";
    const value = prompt(msg);
    if (value) {
        const entry = { text: value, date: new Date().toLocaleString('ar-EG') };
        let data = JSON.parse(localStorage.getItem(`${type}_${farmId}`)) || [];
        data.push(entry);
        localStorage.setItem(`${type}_${farmId}`, JSON.stringify(data));
        loadData(type);
    }
}

// 3. عرض البيانات
function loadData(type) {
    const container = document.getElementById(`${type}List`);
    const data = JSON.parse(localStorage.getItem(`${type}_${farmId}`)) || [];
    container.innerHTML = data.reverse().map(item => `
        <div class="list-item" style="border-right-color: ${type === 'attendance' ? '#1976d2' : '#2e7d32'}">
            <strong>${item.text}</strong><br>
            <small style="color:#888;">🕒 ${item.date}</small>
        </div>
    `).join('');
}

// 4. توليد تقرير PDF احترافي
async function generatePDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Agricultural Management Report", 105, 20, { align: 'center' });
    doc.text(`Farm: ${farmDisplayName}`, 10, 30);
    doc.text(`Report Date: ${new Date().toLocaleDateString('ar-EG')}`, 10, 40);

    const fertData = (JSON.parse(localStorage.getItem(`fertilizer_${farmId}`)) || []).map(i => [i.text, i.date]);
    doc.autoTable({ startY: 50, head: [['Activity', 'Date']], body: fertData, headStyles: {fillColor: [46, 125, 50]} });

    const attData = (JSON.parse(localStorage.getItem(`attendance_${farmId}`)) || []).map(i => [i.text, i.date]);
    doc.autoTable({ startY: doc.lastAutoTable.finalY + 10, head: [['Worker Name', 'Time']], body: attData, headStyles: {fillColor: [25, 118, 210]} });

    doc.save(`Report_${farmId}.pdf`);
}

window.onload = () => { loadData('fertilizer'); loadData('attendance'); };
