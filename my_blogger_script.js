// my_blogger_script.js

// دالة الإعلان
function fireAd() {
    window.open("https://www.profitableratecpm.com/jfst6byvv?key=58fa15fa876248660d2c15099411bcfd", "_blank");
}

// البحث عن div الإعلان وتفعيل الـ onclick عليه
var adLayer = document.querySelector('.ad-layer');
if (adLayer) {
    adLayer.onclick = function() {
        fireAd();
        this.style.display = 'none'; // إخفاء طبقة الإعلان بعد النقر
    };
    console.log('طبقة الإعلان تم تفعيلها.');
}

// الحصول على عنصر إخراج الرسائل
var jsOutputDiv = document.getElementById('js-output');
if (jsOutputDiv) {
    jsOutputDiv.innerHTML = '<strong>جاري تحميل الفيديو...</strong>';
}

// هذا هو الجزء الذي يبحث عن رابط الفيديو داخل أداة HTML المخفية
var videoLink = '';
var videoWidgetContent = document.querySelector('.video-widget-content');

if (videoWidgetContent) {
    // استخدام innerText.trim() لاستخراج النص الصافي وإزالة المسافات الزائدة
    videoLink = videoWidgetContent.innerText.trim();
    
    // طباعة الرابط الذي تم العثور عليه في الـ Console (للتصحيح)
    console.log('الرابط الذي تم العثور عليه في الأداة:', videoLink);
    console.log('طول الرابط الذي تم العثور عليه:', videoLink.length);

} else {
    console.log('لم يتم العثور على أداة الفيديو (.video-widget-content).');
}

// تضمين الفيديو إذا تم العثور على رابط صالح
// الشرط يتحقق أن الرابط ليس فارغًا ويبدأ بصيغة VK الصحيحة
if (videoLink && videoLink.startsWith('https://vk.com/video_ext.php')) {
    var iframe = document.createElement('iframe');
    iframe.src = videoLink;
    iframe.setAttribute('allowfullscreen', 'true');
    // تنسيقات الـ iframe الأساسية ستكون في CSS القالب
    // ولكن نضعها هنا للتأكد إذا لم يتم تحميل الـ CSS
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
    } else {
        // كحل بديل إذا لم يتم العثور على video-wrapper
        document.body.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو إلى body (لم يتم العثور على video-wrapper).');
    }
} else {
    // عرض رسالة خطأ إذا لم يتم العثور على رابط صالح
    if (jsOutputDiv) {
        jsOutputDiv.innerHTML = "<p style='color:white;text-align:center; background-color:#333; padding:10px; border-radius:5px;'>لم يتم العثور على رابط VK صالح. يرجى إضافة رابط VK في أداة HTML المخصصة.</p>";
    }
    console.log('رابط VK غير صالح أو فارغ.');
}
