<?php
session_start();

// Admin oturumunu kontrol et
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin_login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Paneli</title>
    <!-- Chart.js ekleyin -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h2>Hoş Geldiniz, Admin!</h2>

    <!-- Grafik Konteynerleri -->
    <div>
        <canvas id="aylikGrafik" width="400" height="200"></canvas>
    </div>
    <div>
        <canvas id="yillikGrafik" width="400" height="200"></canvas>
    </div>
    <div>
        <canvas id="turGrafik" width="400" height="200"></canvas>
    </div>

    <!-- Diğer admin paneli içeriği buraya gelebilir -->
    <p><a href="admin_logout.php">Çıkış Yap</a></p>

    <script>
        // JavaScript
        document.addEventListener('DOMContentLoaded', function () {
            // Aylara göre satılan kitap sayısı grafiği
            var aylikCtx = document.getElementById('aylikGrafik').getContext('2d');
            var aylikGrafik = new Chart(aylikCtx, {
                type: 'bar',
                data: {
                    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
                    datasets: [{
                        label: 'Satılan Kitap Sayısı',
                        data: [10, 15, 8, 12, 20, 18],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
            });

            // Yıllara göre satılan kitap sayısı grafiği
            var yillikCtx = document.getElementById('yillikGrafik').getContext('2d');
            var yillikGrafik = new Chart(yillikCtx, {
                type: 'line',
                data: {
                    labels: ['2021', '2022', '2023'],
                    datasets: [{
                        label: 'Satılan Kitap Sayısı',
                        data: [50, 80, 120],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
            });

            // Kitap türü ve satılan kitap sayısı grafiği
            var turCtx = document.getElementById('turGrafik').getContext('2d');
            var turGrafik = new Chart(turCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Şiir', 'Roman', 'Biyografi', 'İnceleme'],
                    datasets: [{
                        data: [15, 40, 30, 20],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
                    }]
                },
            });
        });
    </script>
</body>
</html>
