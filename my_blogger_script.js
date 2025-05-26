// my_blogger_script.js
console.log('كود JavaScript يعمل من ملف خارجي!');

var outputDiv = document.getElementById('js-output');
if (outputDiv) {
    outputDiv.innerHTML = '<strong>تم تنفيذ كود JavaScript بنجاح!</strong>';
}

// هنا نقدر نحط كود الفيديو أو أي كود ديناميكي آخر
// عشان الفيديو يبقى ديناميكي لكل صفحة، هنستخدم طريقة مختلفة زي ما اتكلمنا
// مبدئياً، ممكن نختبر برضه برابط ثابت هنا
var videoLink = 'https://vk.com/video_ext.php?oid=760447746&id=456239465';

if (videoLink.startsWith('https://vk.com/video_ext.php')) {
    var iframe = document.createElement('iframe');
    iframe.src = videoLink;
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.style.width = '600px';
    iframe.style.height = '337.5px';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.margin = '20px auto';

    if (outputDiv) {
        outputDiv.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو بنجاح من ملف خارجي!');
    } else {
        document.body.appendChild(iframe);
        console.log('تم إضافة iframe الفيديو إلى body من ملف خارجي!');
    }
} else {
    console.log('رابط VK غير صالح.');
}