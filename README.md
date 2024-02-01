## The Complete Auth System by NextJS

This is a complete authentication system built with NextJS, Mysql, and TailwindCSS. It is a complete system with login, register, and logout functionality. It also has a setting page that is only accessible to logged in users. The setting page is a protected route that redirects to the login page if the user is not logged in. The auth system includes email and password login method and social method. The login user can change the password, 2 factor verification and account role.

### Tech Features

1. Database - Mysql in 'Neon.tech';
2. ORM - Prisma to connect to the database by server action, and generate the schema and client;
3. Fullstack - NextJS to build the frontend and backend;
4. UI - TailwindCSS to build the UI;
5. Authentication - NextAuth to build the authentication system;
6. Email - Resend.com to send the verification email, including change password, 2 factor verification;
7. Social - Google, Github to login;
8. The total authentication process is built with NextAuth, and the result is similar as clerk auth system.
