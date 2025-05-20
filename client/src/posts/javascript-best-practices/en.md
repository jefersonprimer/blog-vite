# Vanilla JavaScript Best Practices

Writing clean, maintainable JavaScript code without frameworks requires discipline and good practices. This post explores key principles for vanilla JavaScript development.

## Keep Functions Small and Focused

Each function should do only one thing and do it well. This makes your code more readable, testable, and reusable.

```javascript
// Bad
function processUserData(user) {
  // Validate user
  if (!user.name) throw new Error('Name is required');
  if (!user.email) throw new Error('Email is required');
  
  // Format user data
  user.name = user.name.trim();
  user.email = user.email.toLowerCase();
  
  // Save user to storage
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
}

// Good
function validateUser(user) {
  if (!user.name) throw new Error('Name is required');
  if (!user.email) throw new Error('Email is required');
  return user;
}

function formatUserData(user) {
  return {
    ...user,
    name: user.name.trim(),
    email: user.email.toLowerCase()
  };
}

function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

function processUserData(user) {
  return saveUser(formatUserData(validateUser(user)));
}
