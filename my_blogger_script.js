// my_blogger_script.js

// دالة الإعلان لفتح نافذة منبثقة
function fireAd() {
    window.open("https://www.profitableratecpm.com/jfst6byvv?key=58fa15fa876248660d2c15099411bcfd", "_blank");
}

// دالة لمعالجة فتح الإعلان عند النقر على طبقة الإعلان
function activateAdLayer() {
    var adLayer = document.querySelector('.ad-layer');
    if (adLayer) {
        // نحطEventListener عشان نضمن إن الأكشن بيحصل لما الطبقة تكون موجودة
        adLayer.addEventListener('click', function() {
            fireAd(); // شغل الإعلان
            this.style.display = 'none'; // إخفاء طبقة الإعلان بعد أول نقرة
            console.log('طبقة الإعلان تم تفعيلها والنقر عليها.');
        });
        console.log('طبقة الإعلان تم تفعيلها.');
    }
}

// الحصول على عنصر إخراج الرسائل (لو محتاجين نعرض رسالة تحميل)
var jsOutputDiv = document.getElementById('js-output');
if (jsOutputDiv) {
    jsOutputDiv.innerHTML = '<strong>جاري تحميل الفيديو...</strong>';
}

// هذا هو الجزء الذي يبحث عن رابط الفيديو داخل محتوى الصفحة نفسها
var videoLink = '';
var videoLinkContainer = document.querySelector('.video-link-container'); // ده الـ div الجديد اللي هنحط فيه الرابط في الصفحة

if (videoLinkContainer) {
    // استخدام innerText.trim() لاستخراج النص الصافي وإزالة المسافات الزائدة
    videoLink = videoLinkContainer.innerText.trim();
    
    // طباعة الرابط الذي تم العثور عليه في الـ Console (للتصحيح)
    console.log('الرابط الذي تم العثور عليه في الصفحة:', videoLink);
    console.log('طول الرابط الذي تم العثور عليه:', videoLink.length);

    // إخفاء الـ div بتاع الرابط عشان ميتعرضش للمستخدم
    videoLinkContainer.style.display = 'none';

} else {
    console.log('لم يتم العثور على حاوية رابط الفيديو (.video-link-container) في الصفحة.');
}

// تضمين الفيديو إذا تم العثور على رابط صالح
if (videoLink && videoLink.startsWith('https://vk.com/video_ext.php')) {
    var iframe = document.createElement('iframe');
    iframe.src = videoLink;
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '1';

    // البحث عن حاوية الفيديو ووضع الـ iframe بداخلها
    var videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.appendChild(iframe);
        // إخفاء رسالة التحميل بمجرد ظهور الفيديو
        if (jsOutputDiv) jsOutputDiv.style.display = 'none';
        console.log('تم إضافة iframe الفيديو بنجاح في video-wrapper!');
        
        // تفعيل طبقة الإعلان بعد إضافة الفيديو
        activateAdLayer();

    } else {
        // كحل بديل إذا لم يتم العثور على video-wrapper
        document.body.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو إلى body (لم يتم العثور على video-wrapper).');
        // تفعيل طبقة الإعلان هنا برضه لو مفيش video-wrapper
        activateAdLayer();
    }
} else {
    // عرض رسالة خطأ إذا لم يتم العثور على رابط صالح
    if (jsOutputDiv) {
        jsOutputDiv.innerHTML = "<p style='color:white;text-align:center; background-color:#333; padding:10px; border-radius:5px;'>لم يتم العثور على رابط VK صالح. يرجى التأكد من إضافة الرابط الصحيح.</p>";
    }
    console.log('رابط VK غير صالح أو فارغ.');
}
