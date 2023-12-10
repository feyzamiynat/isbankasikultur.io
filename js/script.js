function submitForm(event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var feedbackType = document.getElementById("feedbackType").value;

    var message = generateMessage(firstName, lastName, email, feedbackType);

    // Bu noktada, mesajı bir sunucuya gönderme veya başka bir işlem yapma kodunu ekleyebilirsiniz.
    
    // Örneğin, bir e-posta gönderme kütüphanesi kullanarak e-posta gönderebilirsiniz.
    // Ancak, bu işlemi gerçekleştirebilmek için bir sunucu tarafı koduna ihtiyaç duyarsınız.

    // Bu örnekte, sadece konsola mesajı yazdırıyoruz.
    console.log(message);
}

function generateMessage(firstName, lastName, email, feedbackType) {
    var message = `Ad: ${firstName}\nSoyad: ${lastName}\nE-Posta: ${email}\nSeçim: ${feedbackType}`;

    return message;
}
