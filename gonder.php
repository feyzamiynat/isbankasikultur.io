<?php

require 'inc/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ad_soyad = $_POST["ad_soyad"];
    $email = $_POST["email"];
    $mesaj = $_POST["mesaj"];

    $to = "feyzamiynat@gmail.com"; // Alıcı e-posta adresi
    $konu = "İletişim Formu Mesajı";
    $icerik = "Ad Soyad: $ad_soyad\nE-posta: $email\n\nMesaj:\n$mesaj";

    // E-posta gönderme işlemi
    if (mail($to, $konu, $icerik)) {
        echo "E-posta başarıyla gönderildi.";
    } else {
        echo "E-posta gönderirken bir hata oluştu.";
    }
}
?>
