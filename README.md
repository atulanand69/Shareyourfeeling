# ShareFeelings - Anonymous Emotional Support Platform

ShareFeelings is a web application that allows users to anonymously share their feelings and emotions with others. The platform provides a safe space for emotional expression and support.

## Features

- Anonymous user registration with username and phone number
- Secure login system
- Send anonymous messages to admin
- Send anonymous messages to specific users
- WhatsApp integration for direct admin contact
- Feeling filters (angry, anxious, broken, bored, confused, calm)
- Responsive design for all devices
- Modern and intuitive user interface

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sharefeelings.git
cd sharefeelings
```

2. Open the project in your preferred code editor.

3. Start a local server. You can use any of these methods:

   Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js:
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Start the server
   http-server
   ```

4. Open your browser and navigate to:
   - If using Python: `http://localhost:8000`
   - If using http-server: `http://localhost:8080`

## Project Structure

```
sharefeelings/
├── index.html          # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Main dashboard
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── main.js        # Common functionality
│   ├── login.js       # Login functionality
│   ├── register.js    # Registration functionality
│   └── dashboard.js   # Dashboard functionality
└── README.md          # Project documentation
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage for data persistence
- Font Awesome for icons
- Google Fonts

## Security Notes

This is a demo application using localStorage for data persistence. In a production environment, you should:

1. Implement proper backend authentication
2. Use secure password hashing
3. Implement proper session management
4. Use HTTPS
5. Implement rate limiting
6. Add input sanitization
7. Use a proper database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/sharefeelings 