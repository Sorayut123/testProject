const bcrypt = require('bcryptjs');
console.log(bcrypt.compareSync("12345678", "$2b$10$.gHtSwO9lnAkTqlTiAWF0.13R.Vrz845tbqUu5/JpXpKwu3hNICyi"));
