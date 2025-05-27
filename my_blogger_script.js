// my_blogger_script.js

// دالة الإعلان لفتح نافذة منبثقة
function fireAd() {
    window.open("https://www.profitableratecpm.com/jfst6byvv?key=58fa15fa876248660d2c15099411bcfd", "_blank");
}

// دالة لمعالجة فتح الإعلان عند النقر على طبقة الإعلان
function activateAdLayer() {
    var adLayer = document.querySelector('.ad-layer');
    if (adLayer) {
        // نربط الدالة بحدث النقر
        adLayer.addEventListener('click', function() {
            fireAd(); // شغل الإعلان
            this.style.display = 'none'; // إخفاء طبقة الإعلان بعد أول نقرة
            console.log('طبقة الإعلان تم تفعيلها والنقر عليها.');
        });
        console.log('طبقة الإعلان جاهزة للتفاعل.');
    } else {
        console.log('طبقة الإعلان (.ad-layer) غير موجودة في الصفحة.');
    }
}

// الحصول على عنصر إخراج الرسائل (لو محتاجين نعرض رسالة تحميل)
var jsOutputDiv = document.getElementById('js-output');
if (jsOutputDiv) {
    jsOutputDiv.innerHTML = '<strong>جاري تحميل الفيديو...</strong>';
    console.log('عنصر js-output موجود.');
} else {
    console.log('عنصر js-output غير موجود.');
}

// هذا هو الجزء الذي يبحث عن رابط الفيديو داخل محتوى الصفحة (من <span> بسيط)
var videoLinkElement = document.querySelector('.blogger-video-link');
var videoLink = '';

if (videoLinkElement) {
    // استخدام innerText.trim() لاستخراج النص الصافي وإزالة المسافات الزائدة
    videoLink = videoLinkElement.innerText.trim();
    
    // إخفاء العنصر بعد قراءة الرابط عشان ميتعرضش للمستخدم
    videoLinkElement.style.display = 'none';
    
    console.log('الرابط الذي تم العثور عليه في الصفحة:', videoLink);
    console.log('طول الرابط الذي تم العثور عليه:', videoLink.length);

} else {
    console.log('لم يتم العثور على وسم الرابط (.blogger-video-link) في الصفحة.');
    if (jsOutputDiv) {
        jsOutputDiv.innerHTML = "<p style='color:white;text-align:center; background-color:#333; padding:10px; border-radius:5px;'>لا يوجد رابط فيديو محدد في هذه الصفحة.</p>";
    }
}

// تضمين الفيديو إذا تم العثور على رابط صالح (فقط روابط VK)
if (videoLink && videoLink.startsWith('https://vk.com/video_ext.php')) {
    var iframe = document.createElement('iframe');
    iframe.src = videoLink;
    iframe.setAttribute('allowfullscreen', 'true');
    
    // خصائص CSS الأساسية للـ iframe عشان يملأ الـ wrapper
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '1';

    // البحث عن حاوية الفيديو (.video-wrapper) ووضع الـ iframe بداخلها
    var videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.appendChild(iframe);
        // إخفاء رسالة التحميل بمجرد ظهور الفيديو
        if (jsOutputDiv) jsOutputDiv.style.display = 'none';
        console.log('تم إضافة iframe الفيديو بنجاح في video-wrapper!');
        
        // تفعيل طبقة الإعلان بعد إضافة الفيديو
        activateAdLayer();

    } else {
        // كحل بديل إذا لم يتم العثور على video-wrapper (ممكن لو القالب مش متظبط)
        document.body.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو إلى body (لم يتم العثور على video-wrapper).');
        activateAdLayer();
    }
} else {
    // عرض رسالة خطأ إذا لم يتم العثور على رابط صالح أو كان فارغًا
    if (jsOutputDiv && videoLinkElement) { // لو العنصر بتاع الرابط موجود بس الرابط نفسه مش صالح
        jsOutputDiv.innerHTML = "<p style='color:white;text-align:center; background-color:#333; padding:10px; border-radius:5px;'>الرابط المدخل غير صالح (غير رابط VK). يرجى التأكد من الصيغة الصحيحة.</p>";
    } else if (jsOutputDiv && !videoLinkElement) { // لو عنصر الرابط نفسه مش موجود
        // دي المفروض تكون تغطتها الرسالة الأولانية "لا يوجد رابط فيديو محدد"
    }
    console.log('رابط VK غير صالح أو فارغ.');
}
