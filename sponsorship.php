<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sponsorship - NIBF 2025</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .sponsorship-hero {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('images/slides/slide1.jpg');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 100px 0;
            text-align: center;
        }

        .sponsorship-packages {
            padding: 80px 0;
            background: #f9f9f9;
        }

        .package-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            padding: 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .package-card {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .package-card:hover {
            transform: translateY(-10px);
        }

        .package-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .package-price {
            font-size: 2em;
            color: #e74c3c;
            font-weight: bold;
            margin: 20px 0;
        }

        .package-features {
            list-style: none;
            padding: 0;
        }

        .package-features li {
            margin: 15px 0;
            padding-left: 25px;
            position: relative;
        }

        .package-features li:before {
            content: "✓";
            color: #2ecc71;
            position: absolute;
            left: 0;
        }

        .contact-section {
            background: #2c3e50;
            color: white;
            padding: 60px 0;
            text-align: center;
        }

        .contact-info {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .contact-info i {
            margin-right: 10px;
            color: #e74c3c;
        }

        .intro-section {
            padding: 60px 20px;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }

        .intro-section h2 {
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .intro-section p {
            font-size: 1.1em;
            line-height: 1.6;
            color: #666;
        }
    </style>
</head>
<body>
    <?php include 'header.php'; ?>

    <div class="sponsorship-hero">
        <h1>Sponsorship Opportunities</h1>
        <p>Support education, literacy, and new learning</p>
    </div>

    <div class="intro-section">
        <h2>Gain Optimum Exposure</h2>
        <p>When you sponsor NIBF 2025, you get the opportunity to connect with top industry leaders, book enthusiasts, school, students, and position your brand as supportive of education and the future of Nigeria and Africa.</p>
    </div>

    <div class="sponsorship-packages">
        <div class="package-grid">
            <div class="package-card">
                <div class="package-header">
                    <h3>PLATINUM SPONSOR</h3>
                    <div class="package-price">₦15 Million</div>
                </div>
                <ul class="package-features">
                    <li>Center Spread Advertisement in the catalogue</li>
                    <li>Website Advertisement Space for one year</li>
                    <li>4 Personnel at Business Networking Dinner</li>
                    <li>Company branding in marketing materials</li>
                    <li>Distribution of marketing materials</li>
                    <li>15mins marketing at Conference & Summit</li>
                    <li>Plaque of recognition</li>
                    <li>Registration centre branding</li>
                    <li>Conference hall branding</li>
                </ul>
            </div>

            <div class="package-card">
                <div class="package-header">
                    <h3>GOLD SPONSOR</h3>
                    <div class="package-price">₦10 Million</div>
                </div>
                <ul class="package-features">
                    <li>Inside Front Cover Advertisement</li>
                    <li>Website Advertisement Space for one year</li>
                    <li>3 Personnel at Business Networking Dinner</li>
                    <li>Company branding in marketing materials</li>
                    <li>Distribution of marketing materials</li>
                    <li>10mins marketing at Conference & Summit</li>
                    <li>Plaque of recognition</li>
                    <li>5 roll up banners placement</li>
                    <li>Conference backdrop advertisement</li>
                </ul>
            </div>

            <div class="package-card">
                <div class="package-header">
                    <h3>SILVER SPONSOR</h3>
                    <div class="package-price">₦7 Million</div>
                </div>
                <ul class="package-features">
                    <li>Run Off Page Advertisement</li>
                    <li>Website Advertisement Space for one year</li>
                    <li>2 Personnel at Business Networking Dinner</li>
                    <li>Company branding in marketing materials</li>
                    <li>Distribution of marketing materials</li>
                    <li>10mins marketing at Conference</li>
                    <li>Plaque of recognition</li>
                    <li>Conference backdrop advertisement</li>
                </ul>
            </div>

            <div class="package-card">
                <div class="package-header">
                    <h3>BRONZE SPONSOR</h3>
                    <div class="package-price">₦5.5 Million</div>
                </div>
                <ul class="package-features">
                    <li>Run Off Page Advertisement</li>
                    <li>Website Advertisement Space for one year</li>
                    <li>1 Personnel at Business Networking Dinner</li>
                    <li>Company branding in marketing materials</li>
                    <li>Distribution of marketing materials</li>
                    <li>5mins marketing at Education Summit</li>
                    <li>Plaque of recognition</li>
                    <li>Conference backdrop advertisement</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="contact-section">
        <div class="contact-info">
            <h2>Ready to become a sponsor?</h2>
            <p>Contact the NIBF Secretariat for further discussions:</p>
            <p><i class="fas fa-envelope"></i> info@nibfng.org</p>
            <p><i class="fas fa-phone"></i> 234-803-402-6971</p>
            <p><i class="fas fa-phone"></i> 0708-409-9363</p>
        </div>
    </div>

    <?php include 'footer.php'; ?>
</body>
</html> 