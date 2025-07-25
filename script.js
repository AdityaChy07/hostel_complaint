let users = [];

// Load users from users.txt file
async function loadUsers() {
    try {
        const response = await fetch('users.txt'); // Fetch the users.txt file
        if (!response.ok) throw new Error('Failed to load users.txt');
        const text = await response.text();
        parseTXT(text); // Parse the file contents
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Failed to load users.txt. Please ensure the file exists in the project folder.');
    }
}

// Parse the content of users.txt
function parseTXT(text) {
    const lines = text.split('\n');
    
    // For debugging: log the raw data to see the structure
    console.log('Loaded users.txt:', lines);

    users = lines.map(line => {
        const values = line.split(':');
        if (values.length === 3) {
            return {
                username: values[0].trim(),
                password: values[1].trim(),
                role: values[2].trim()
            };
        }
        return null;
    }).filter(user => user !== null);

    // For debugging: log the parsed users array
    console.log('Parsed users:', users);
}

// Authenticate user
function authenticate(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Find the user based on username, password, and role
    const user = users.find(u => u.username === username && u.password === password && u.role === window.selectedTab);

    // For debugging: log the authentication result
    console.log('Authentication attempt:', { username, password, selectedTab: window.selectedTab, user });

    if (user) {
        showTab(window.selectedTab); // If credentials match, show the tab
    } else {
        alert("Invalid credentials! Access Denied.");
    }
}

// Show the selected tab content
function showTab(tabId) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}

// Show login form for the selected tab
function showLogin(tabId) {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('fileComplaint').style.display = 'none';
    document.getElementById('complaintHandler').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    window.selectedTab = tabId;
}

// Load users when the page loads
window.addEventListener('load', () => {
    loadUsers(); // Load users from users.txt file when the page loads
});
