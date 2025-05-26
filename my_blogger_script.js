// my_blogger_script.js
console.log('كود JavaScript يعمل من ملف خارجي لدعم الفيديو الديناميكي!');

// دالة الإعلان (احتفظ بها لو عايزها)
function fireAd() {
    window.open("https://www.profitableratecpm.com/jfst6byvv?key=58fa15fa876248660d2c15099411bcfd", "_blank");
}

// البحث عن div الإعلان وتفعيله
var adLayer = document.querySelector('.ad-layer');
if (adLayer) {
    adLayer.onclick = function() {
        fireAd();
        this.style.display = 'none';
    };
    console.log('طبقة الإعلان تم تفعيلها.');
}


var outputDiv = document.getElementById('js-output');
if (outputDiv) {
    outputDiv.innerHTML = '<strong>جاري تحميل الفيديو...</strong>';
}

// هذا هو الجزء الجديد: البحث عن رابط الفيديو من محتوى أداة HTML
var videoLink = '';
var videoWidgetContent = document.querySelector('.video-widget-content');
if (videoWidgetContent) {
    videoLink = videoWidgetContent.innerText.trim(); // استخراج النص فقط
    console.log('تم العثور على رابط في الأداة: ' + videoLink);
} else {
    console.log('لم يتم العثور على أداة الفيديو (.video-widget-content).');
}

// تضمين الفيديو إذا تم العثور على رابط صالح
if (videoLink.startsWith('https://vk.com/video_ext.php')) {
    var iframe = document.createElement('iframe');
    iframe.src = videoLink;
    iframe.setAttribute('allowfullscreen', 'true');
    // لاحظ: خصائص العرض والارتفاع أصبحت CSS لتجنب المشاكل في الـ JS
    // iframe.style.width = '100%';
    // iframe.style.height = '100%';
    iframe.style.border = 'none'; // الحدود هتكون في CSS القالب
    // iframe.style.display = 'block';
    // iframe.style.margin = '20px auto';

    // يفضل وضع iframe داخل container (مثل video-wrapper) للتحكم في حجمه بالـ CSS
    var videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.appendChild(iframe);
        if (outputDiv) outputDiv.style.display = 'none'; // إخفاء رسالة التحميل
        console.log('تم إضافة iframe الفيديو بنجاح في video-wrapper!');
    } else if (outputDiv) {
        outputDiv.innerHTML = ''; // مسح رسالة التحميل
        outputDiv.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو بنجاح في js-output!');
    } else {
        document.body.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو إلى body!');
    }
} else {
    if (outputDiv) {
        outputDiv.innerHTML = "<p style='color:white;text-align:center; background-color:#333; padding:10px; border-radius:5px;'>لم يتم العثور على رابط VK صالح. يرجى إضافة رابط VK في أداة HTML المخصصة.</p>";
    }
    console.log('رابط VK غير صالح.');
}
